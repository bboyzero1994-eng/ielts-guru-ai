import { Question } from "@/types/ielts";

export const questions: Question[] = [
  // PART 1 - Familiar topics
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

  // PART 2 - Cue cards
  {
    id: "p2-1", part: 2, topic: "A Memorable Trip",
    question: "Describe a memorable trip you have taken.",
    cueCard: {
      prompt: "Describe a memorable trip you have taken.",
      bullets: ["Where you went", "Who you went with", "What you did there", "Why it was memorable"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-2", part: 2, topic: "A Person You Admire",
    question: "Describe a person you admire.",
    cueCard: {
      prompt: "Describe a person you admire.",
      bullets: ["Who this person is", "How you know them", "What they do", "Why you admire them"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-3", part: 2, topic: "A Skill You Learned",
    question: "Describe a skill you learned recently.",
    cueCard: {
      prompt: "Describe a skill you learned recently.",
      bullets: ["What the skill is", "How you learned it", "How long it took", "How it has helped you"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-4", part: 2, topic: "A Book You Enjoyed",
    question: "Describe a book you enjoyed reading.",
    cueCard: {
      prompt: "Describe a book you enjoyed reading.",
      bullets: ["What the book is about", "When you read it", "Why you chose it", "What you liked about it"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-5", part: 2, topic: "A Place You'd Like to Visit",
    question: "Describe a place you would like to visit.",
    cueCard: {
      prompt: "Describe a place you would like to visit.",
      bullets: ["Where it is", "How you heard about it", "What you would do there", "Why you want to go"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-6", part: 2, topic: "A Special Event",
    question: "Describe a special event you attended.",
    cueCard: {
      prompt: "Describe a special event you attended.",
      bullets: ["What the event was", "Where it took place", "Who was there", "How you felt about it"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-7", part: 2, topic: "Your Favorite Teacher",
    question: "Describe your favorite teacher.",
    cueCard: {
      prompt: "Describe your favorite teacher.",
      bullets: ["Who they were", "What subject they taught", "What made them special", "How they influenced you"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-8", part: 2, topic: "An Achievement",
    question: "Describe an achievement you are proud of.",
    cueCard: {
      prompt: "Describe an achievement you are proud of.",
      bullets: ["What you achieved", "When it happened", "How you achieved it", "Why you are proud of it"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-9", part: 2, topic: "A Childhood Memory",
    question: "Describe a happy childhood memory.",
    cueCard: {
      prompt: "Describe a happy childhood memory.",
      bullets: ["What happened", "How old you were", "Who was involved", "Why you remember it"],
      prepTime: 60, speakTime: 120,
    },
  },
  {
    id: "p2-10", part: 2, topic: "A Gift You Received",
    question: "Describe a gift you received that was special.",
    cueCard: {
      prompt: "Describe a gift you received that was special.",
      bullets: ["What the gift was", "Who gave it to you", "When you received it", "Why it was special"],
      prepTime: 60, speakTime: 120,
    },
  },

  // PART 3 - Abstract discussion
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
];

export function getQuestionsByPart(part: 1 | 2 | 3) {
  return questions.filter((q) => q.part === part);
}

export function getQuestionById(id: string) {
  return questions.find((q) => q.id === id);
}
