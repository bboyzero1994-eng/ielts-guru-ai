
-- PROFILES
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  target_band NUMERIC(2,1),
  daily_goal INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- PRACTICE RESULTS
CREATE TABLE public.practice_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  part INTEGER NOT NULL,
  topic TEXT,
  question TEXT NOT NULL,
  transcript TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  fluency NUMERIC(3,1),
  lexical NUMERIC(3,1),
  grammar NUMERIC(3,1),
  pronunciation NUMERIC(3,1),
  overall_band NUMERIC(3,1),
  feedback TEXT,
  sample_answer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_results TO authenticated;
GRANT ALL ON public.practice_results TO service_role;
ALTER TABLE public.practice_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own results" ON public.practice_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own results" ON public.practice_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own results" ON public.practice_results FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_practice_results_user_created ON public.practice_results(user_id, created_at DESC);

-- USER PROGRESS
CREATE TABLE public.user_progress (
  user_id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak INTEGER NOT NULL DEFAULT 0,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  last_practice_date DATE,
  completed_question_ids TEXT[] NOT NULL DEFAULT '{}',
  achievement_ids TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_user_progress_updated BEFORE UPDATE ON public.user_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile + progress on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  INSERT INTO public.user_progress (user_id) VALUES (NEW.id);
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
