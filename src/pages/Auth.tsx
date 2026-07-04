import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Flame, Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate("/", { replace: true });
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast({ title: "Đăng ký thành công!", description: "Kiểm tra email để xác nhận tài khoản, hoặc đăng nhập ngay." });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Chào mừng trở lại! 👋" });
      }
    } catch (err: any) {
      toast({
        title: mode === "signup" ? "Đăng ký thất bại" : "Đăng nhập thất bại",
        description: err.message || "Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-2">
            <Flame className="w-9 h-9 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-foreground">IELTS Speaking</h1>
          <p className="text-muted-foreground font-semibold">
            {mode === "signup" ? "Tạo tài khoản để lưu tiến độ" : "Đăng nhập để tiếp tục"}
          </p>
        </div>

        <Card className="border-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-bold mb-1.5 block">Tên hiển thị</label>
                  <Input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-bold mb-1.5 block">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-1.5 block">Mật khẩu</label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl font-black h-12 text-base"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "signup" ? "Đăng ký" : "Đăng nhập"}
              </Button>
            </form>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="text-sm font-bold text-primary hover:underline"
              >
                {mode === "signup"
                  ? "Đã có tài khoản? Đăng nhập"
                  : "Chưa có tài khoản? Đăng ký ngay"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
