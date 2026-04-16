import { Question } from "@/types/ielts";

export const questions: Question[] = [
  // ===================== PART 1 — Familiar Topics =====================
  { id: "p1-1", part: 1, topic: "Home", question: "Can you describe your home?" },
  { id: "p1-2", part: 1, topic: "Work/Study", question: "Do you work or are you a student?" },
  { id: "p1-3", part: 1, topic: "Hometown", question: "Where is your hometown?" },
  { id: "p1-4", part: 1, topic: "Family", question: "Can you tell me about your family?" },
  { id: "p1-5", part: 1, topic: "Hobbies", question: "What do you do in your free time?" },
  { id: "p1-6", part: 1, topic: "Food", question: "What kind of food do you like?" },
  { id: "p1-7", part: 1, topic: "Weather", question: "What's the weather like in your country?" },
  { id: "p1-8", part: 1, topic: "Transport", question: "How do you usually travel to work or school?" },
  { id: "p1-9", part: 1, topic: "Music", question: "What type of music do you enjoy?" },
  { id: "p1-10", part: 1, topic: "Reading", question: "Do you like reading? What do you read?" },
  { id: "p1-11", part: 1, topic: "Sports", question: "Do you play any sports?" },
  { id: "p1-12", part: 1, topic: "Technology", question: "How often do you use the internet?" },
  { id: "p1-13", part: 1, topic: "Friends", question: "Do you prefer spending time with friends or alone?" },
  { id: "p1-14", part: 1, topic: "Shopping", question: "Do you enjoy shopping? Why or why not?" },
  { id: "p1-15", part: 1, topic: "Sleep", question: "How many hours of sleep do you usually get?" },
  // New Part 1 questions
  { id: "p1-16", part: 1, topic: "Morning Routine", question: "What do you usually do in the morning?" },
  { id: "p1-17", part: 1, topic: "Neighbours", question: "Do you know your neighbours well?" },
  { id: "p1-18", part: 1, topic: "Pets", question: "Do you have any pets? Would you like one?" },
  { id: "p1-19", part: 1, topic: "Colors", question: "What is your favorite color and why?" },
  { id: "p1-20", part: 1, topic: "Holidays", question: "What do you usually do on public holidays?" },
  { id: "p1-21", part: 1, topic: "Movies", question: "What kinds of movies do you like to watch?" },
  { id: "p1-22", part: 1, topic: "Social Media", question: "How much time do you spend on social media?" },
  { id: "p1-23", part: 1, topic: "Cooking", question: "Do you enjoy cooking? What do you cook?" },
  { id: "p1-24", part: 1, topic: "Photography", question: "Do you like taking photos? What do you photograph?" },
  { id: "p1-25", part: 1, topic: "Languages", question: "Have you ever tried to learn another language?" },
  { id: "p1-26", part: 1, topic: "Weekends", question: "What do you usually do at weekends?" },
  { id: "p1-27", part: 1, topic: "Gardens", question: "Do you like spending time in gardens or parks?" },
  { id: "p1-28", part: 1, topic: "Birthdays", question: "How do you usually celebrate your birthday?" },
  { id: "p1-29", part: 1, topic: "Art", question: "Are you interested in art? Why or why not?" },
  { id: "p1-30", part: 1, topic: "Handwriting", question: "Do you prefer handwriting or typing?" },

  // ===================== PART 2 — Cue Cards =====================
  {
    id: "p2-1", part: 2, topic: "A Memorable Trip",
    question: "Describe a memorable trip you have taken.",
    cueCard: { prompt: "Describe a memorable trip you have taken.", bullets: ["Where you went", "Who you went with", "What you did there", "Why it was memorable"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-2", part: 2, topic: "A Person You Admire",
    question: "Describe a person you admire.",
    cueCard: { prompt: "Describe a person you admire.", bullets: ["Who this person is", "How you know them", "What they do", "Why you admire them"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-3", part: 2, topic: "A Skill You Learned",
    question: "Describe a skill you learned recently.",
    cueCard: { prompt: "Describe a skill you learned recently.", bullets: ["What the skill is", "How you learned it", "How long it took", "How it has helped you"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-4", part: 2, topic: "A Book You Enjoyed",
    question: "Describe a book you enjoyed reading.",
    cueCard: { prompt: "Describe a book you enjoyed reading.", bullets: ["What the book is about", "When you read it", "Why you chose it", "What you liked about it"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-5", part: 2, topic: "A Place You'd Like to Visit",
    question: "Describe a place you would like to visit.",
    cueCard: { prompt: "Describe a place you would like to visit.", bullets: ["Where it is", "How you heard about it", "What you would do there", "Why you want to go"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-6", part: 2, topic: "A Special Event",
    question: "Describe a special event you attended.",
    cueCard: { prompt: "Describe a special event you attended.", bullets: ["What the event was", "Where it took place", "Who was there", "How you felt about it"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-7", part: 2, topic: "Your Favorite Teacher",
    question: "Describe your favorite teacher.",
    cueCard: { prompt: "Describe your favorite teacher.", bullets: ["Who they were", "What subject they taught", "What made them special", "How they influenced you"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-8", part: 2, topic: "An Achievement",
    question: "Describe an achievement you are proud of.",
    cueCard: { prompt: "Describe an achievement you are proud of.", bullets: ["What you achieved", "When it happened", "How you achieved it", "Why you are proud of it"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-9", part: 2, topic: "A Childhood Memory",
    question: "Describe a happy childhood memory.",
    cueCard: { prompt: "Describe a happy childhood memory.", bullets: ["What happened", "How old you were", "Who was involved", "Why you remember it"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-10", part: 2, topic: "A Gift You Received",
    question: "Describe a gift you received that was special.",
    cueCard: { prompt: "Describe a gift you received that was special.", bullets: ["What the gift was", "Who gave it to you", "When you received it", "Why it was special"], prepTime: 60, speakTime: 120 },
  },
  // New Part 2 questions
  {
    id: "p2-11", part: 2, topic: "A Time You Helped Someone",
    question: "Describe a time you helped someone.",
    cueCard: { prompt: "Describe a time you helped someone.", bullets: ["Who you helped", "What the situation was", "How you helped them", "How you felt afterwards"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-12", part: 2, topic: "A Piece of Technology",
    question: "Describe a piece of technology you find useful.",
    cueCard: { prompt: "Describe a piece of technology you find useful.", bullets: ["What it is", "How often you use it", "What you use it for", "Why it is useful to you"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-13", part: 2, topic: "A Difficult Decision",
    question: "Describe a difficult decision you had to make.",
    cueCard: { prompt: "Describe a difficult decision you had to make.", bullets: ["What the decision was", "When you had to make it", "What options you had", "How you felt about the outcome"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-14", part: 2, topic: "A Hobby You Enjoy",
    question: "Describe a hobby you really enjoy.",
    cueCard: { prompt: "Describe a hobby you really enjoy.", bullets: ["What the hobby is", "How you started it", "How often you do it", "Why you enjoy it so much"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-15", part: 2, topic: "An Important Change",
    question: "Describe an important change in your life.",
    cueCard: { prompt: "Describe an important change in your life.", bullets: ["What the change was", "When it happened", "How it affected you", "How you feel about it now"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-16", part: 2, topic: "A Beautiful Place",
    question: "Describe a beautiful place you have visited.",
    cueCard: { prompt: "Describe a beautiful place you have visited.", bullets: ["Where it is", "When you visited", "What it looked like", "Why you think it is beautiful"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-17", part: 2, topic: "A Movie You Loved",
    question: "Describe a movie that you really enjoyed.",
    cueCard: { prompt: "Describe a movie that you really enjoyed.", bullets: ["What the movie was about", "When you watched it", "Who you watched it with", "Why you enjoyed it"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-18", part: 2, topic: "A Famous Person",
    question: "Describe a famous person you would like to meet.",
    cueCard: { prompt: "Describe a famous person you would like to meet.", bullets: ["Who they are", "What they are famous for", "How you know about them", "Why you want to meet them"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-19", part: 2, topic: "A Time You Were Surprised",
    question: "Describe a time when you were pleasantly surprised.",
    cueCard: { prompt: "Describe a time when you were pleasantly surprised.", bullets: ["When it happened", "What surprised you", "Who was involved", "How you felt"], prepTime: 60, speakTime: 120 },
  },
  {
    id: "p2-20", part: 2, topic: "A Goal You Set",
    question: "Describe a goal you set and achieved.",
    cueCard: { prompt: "Describe a goal you set and achieved.", bullets: ["What the goal was", "Why you set this goal", "How you achieved it", "How you felt when you achieved it"], prepTime: 60, speakTime: 120 },
  },

  // ===================== PART 3 — Abstract Discussion =====================
  { id: "p3-1", part: 3, topic: "Education", question: "How has education changed in your country over the past few decades?" },
  { id: "p3-2", part: 3, topic: "Technology", question: "Do you think technology has made our lives better or worse?" },
  { id: "p3-3", part: 3, topic: "Environment", question: "What can individuals do to protect the environment?" },
  { id: "p3-4", part: 3, topic: "Globalization", question: "How has globalization affected local cultures?" },
  { id: "p3-5", part: 3, topic: "Health", question: "Why do you think mental health is getting more attention nowadays?" },
  { id: "p3-6", part: 3, topic: "Work", question: "Do you think working from home will become the norm in the future?" },
  { id: "p3-7", part: 3, topic: "Media", question: "How has social media changed the way people communicate?" },
  { id: "p3-8", part: 3, topic: "Travel", question: "Do you think international travel broadens the mind?" },
  { id: "p3-9", part: 3, topic: "Society", question: "What are the advantages and disadvantages of living in a big city?" },
  { id: "p3-10", part: 3, topic: "Age", question: "How are the lives of older people different from younger people today?" },
  { id: "p3-11", part: 3, topic: "Success", question: "What does success mean to you?" },
  { id: "p3-12", part: 3, topic: "Culture", question: "Why is it important to preserve traditional customs?" },
  { id: "p3-13", part: 3, topic: "Innovation", question: "How will artificial intelligence change our daily lives?" },
  { id: "p3-14", part: 3, topic: "Economy", question: "What are the effects of unemployment on society?" },
  { id: "p3-15", part: 3, topic: "Leadership", question: "What qualities make a good leader?" },
  // New Part 3 questions
  { id: "p3-16", part: 3, topic: "Education", question: "Should university education be free for everyone?" },
  { id: "p3-17", part: 3, topic: "Technology", question: "Is it good that children use smartphones from a young age?" },
  { id: "p3-18", part: 3, topic: "Environment", question: "Do you think governments do enough to fight climate change?" },
  { id: "p3-19", part: 3, topic: "Work", question: "How important is job satisfaction compared to a high salary?" },
  { id: "p3-20", part: 3, topic: "Society", question: "Why do some people volunteer while others don't?" },
  { id: "p3-21", part: 3, topic: "Media", question: "Should the news always be objective, or is bias inevitable?" },
  { id: "p3-22", part: 3, topic: "Health", question: "How can governments encourage people to live healthier lifestyles?" },
  { id: "p3-23", part: 3, topic: "Travel", question: "What impact does mass tourism have on local communities?" },
  { id: "p3-24", part: 3, topic: "Culture", question: "Do you think globalization is destroying cultural diversity?" },
  { id: "p3-25", part: 3, topic: "Innovation", question: "Should there be limits on what technology can do?" },
  { id: "p3-26", part: 3, topic: "Education", question: "What role should technology play in the classroom?" },
  { id: "p3-27", part: 3, topic: "Society", question: "Is the gap between the rich and poor getting wider?" },
  { id: "p3-28", part: 3, topic: "Age", question: "Should the retirement age be raised in your country?" },
  { id: "p3-29", part: 3, topic: "Success", question: "Do you think people today are under too much pressure to succeed?" },
  { id: "p3-30", part: 3, topic: "Leadership", question: "Are leaders born or made?" },
];

export function getQuestionsByPart(part: 1 | 2 | 3) {
  return questions.filter((q) => q.part === part);
}

export function getQuestionById(id: string) {
  return questions.find((q) => q.id === id);
}
