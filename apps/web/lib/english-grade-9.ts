export type EnglishQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export type EnglishQuestionSet = {
  id: string;
  title: string;
  questions: EnglishQuestion[];
};

export type EnglishChapter = {
  id: string;
  title: string;
  summary: string;
  textbookScope: string;
  questionSets: EnglishQuestionSet[];
};

export type EnglishChapterModeContent = {
  learn: {
    overview: string;
    keyIdeas: string[];
  };
  review: {
    checklist: string[];
    quickPrompts: string[];
  };
};

function q(
  id: string,
  prompt: string,
  options: string[],
  correctOption: number,
  explanation: string,
): EnglishQuestion {
  return { id, prompt, options, correctOption, explanation };
}

function set(
  id: string,
  title: string,
  questions: EnglishQuestion[],
): EnglishQuestionSet {
  return { id, title, questions };
}

export const grade9EnglishChapters: EnglishChapter[] = [
  {
    id: "unit-1-local-community",
    title: "Unit 1. Local Community",
    summary:
      "Students build vocabulary and grammar for talking about places, services, people, and activities in their local community.",
    textbookScope: "Tiếng Anh 9 - Global Success",
    questionSets: [
      set("e1-set-1", "Bộ câu hỏi 1", [
        q("e1s1q1", "Choose the best word: A local ______ often sells fresh vegetables and fruit.", ["market", "museum", "factory", "stadium"], 0, "A market is a common place in the local community where people buy fresh food."),
        q("e1s1q2", "Which sentence is correct?", ["There is a park near my house.", "There are a park near my house.", "There is many parks near my house.", "There park is near my house."], 0, "Use 'There is' with a singular noun: 'There is a park near my house.'"),
        q("e1s1q3", "Choose the odd one out.", ["library", "post office", "baker", "hospital"], 2, "The first, second, and fourth are places. 'Baker' is a person."),
        q("e1s1q4", "A person who works in a bakery is a ______.", ["teacher", "baker", "doctor", "farmer"], 1, "A baker makes or sells bread and cakes."),
        q("e1s1q5", "Which question matches the answer 'It is opposite the school'?", ["Where is the community centre?", "How old is the community centre?", "Who visits the community centre?", "Why do you like the community centre?"], 0, "The answer gives a location, so the correct question starts with 'Where'."),
        q("e1s1q6", "Choose the correct preposition: The bank is ______ the pharmacy and the bookshop.", ["between", "under", "behind", "during"], 0, "Use 'between' for something in the middle of two places."),
        q("e1s1q7", "Which activity helps the local community?", ["Littering in the street", "Volunteering at the weekend", "Breaking public signs", "Ignoring old neighbours"], 1, "Volunteering is a positive action that supports the local community."),
        q("e1s1q8", "Choose the best response: 'What do you like about your neighbourhood?'", ["It is friendly and convenient.", "I like English on Fridays.", "I go there by bike.", "My teacher is kind."], 0, "The answer should describe the neighbourhood."),
        q("e1s1q9", "The word 'convenient' is closest in meaning to ______.", ["easy to use", "very old", "too noisy", "full of rain"], 0, "Convenient means easy, useful, and suitable."),
        q("e1s1q10", "Which sentence talks about a repeated action?", ["My father always shops at the local market.", "We are visiting the museum now.", "They went to the park yesterday.", "She will call the manager tomorrow."], 0, "The adverb 'always' shows a repeated or habitual action."),
      ]),
      set("e1-set-2", "Bộ câu hỏi 2", [
        q("e1s2q1", "Choose the correct word: The people in my area are very ______ and always ready to help.", ["friendly", "empty", "dangerous", "expensive"], 0, "Friendly describes kind and pleasant people."),
        q("e1s2q2", "A place where people borrow books is a ______.", ["library", "cinema", "bus stop", "restaurant"], 0, "People borrow and read books in a library."),
        q("e1s2q3", "Which sentence is grammatically correct?", ["There are two supermarkets in my town.", "There is two supermarkets in my town.", "There have two supermarkets in my town.", "Two supermarkets there are in my town."], 0, "Use 'There are' with plural nouns."),
        q("e1s2q4", "Choose the best question: '______' 'Because it has a beautiful lake and many trees.'", ["Why do you like the park?", "Where is the park?", "When do you visit the park?", "Who cleans the park?"], 0, "The answer gives a reason, so the question should start with 'Why'."),
        q("e1s2q5", "Which word describes a person who works to improve the community without payment?", ["volunteer", "visitor", "designer", "tourist"], 0, "A volunteer works to help others without being paid."),
        q("e1s2q6", "Choose the correct preposition: The bookstore is ______ the corner of the street.", ["on", "during", "into", "for"], 0, "We say 'on the corner' to describe a location at a street corner."),
        q("e1s2q7", "Which sentence uses the present simple correctly?", ["My mother goes to the market every morning.", "My mother go to the market every morning.", "My mother is go to the market every morning.", "My mother going to the market every morning."], 0, "With third-person singular subjects, add '-es' to 'go'."),
        q("e1s2q8", "The opposite of 'noisy' is ______.", ["quiet", "crowded", "large", "modern"], 0, "Quiet is the opposite of noisy."),
        q("e1s2q9", "Choose the best title for a text about parks, libraries, and clinics in a neighbourhood.", ["Useful places in my community", "My favourite school subjects", "A day at the beach", "How to cook dinner"], 0, "The title should match the topic of community places."),
        q("e1s2q10", "Which answer fits: 'How can students help the local community?'", ["They can collect rubbish and help old people.", "It is near the school gate.", "It opens at seven o'clock.", "It has many tall buildings."], 0, "The answer should explain actions students can take."),
      ]),
      set("e1-set-3", "Bộ câu hỏi 3", [
        q("e1s3q1", "Choose the correct sentence.", ["Our community centre offers free classes for children.", "Our community centre offer free classes for children.", "Our community centre offering free classes for children.", "Our community centre are free classes for children."], 0, "A singular subject takes the singular verb 'offers'."),
        q("e1s3q2", "Which place is most suitable for seeing a doctor?", ["clinic", "bakery", "library", "museum"], 0, "A clinic is a place for medical care."),
        q("e1s3q3", "Choose the best word: A good neighbourhood should be safe and ______.", ["clean", "late", "hungry", "broken"], 0, "A clean neighbourhood is a common positive description."),
        q("e1s3q4", "Which sentence asks for directions?", ["Can you tell me how to get to the post office?", "Do you like the post office?", "Who works at the post office?", "Why was the post office closed?"], 0, "Asking 'how to get to' a place is asking for directions."),
        q("e1s3q5", "If the cinema is next to the supermarket, it is ______ the supermarket.", ["beside", "under", "through", "before"], 0, "Beside means next to."),
        q("e1s3q6", "Choose the correct word: People can join a clean-up ______ at the weekend.", ["campaign", "kitchen", "passport", "factory"], 0, "A clean-up campaign is a common community activity."),
        q("e1s3q7", "Which sentence is about community service?", ["Students plant trees in the schoolyard.", "Students sleep late on Sunday.", "Students watch a comedy at home.", "Students buy a new phone."], 0, "Planting trees is a service activity that benefits others."),
        q("e1s3q8", "The phrase 'public place' refers to ______.", ["a place open to everyone", "a private bedroom", "a family meal", "a homework notebook"], 0, "A public place is open or accessible to many people."),
        q("e1s3q9", "Choose the best ending: 'My neighbourhood is convenient because ______.'", ["everything I need is nearby", "I never go outside", "the streets are always closed", "there are no services"], 0, "Convenient means useful and easy because important places are nearby."),
        q("e1s3q10", "What is the main purpose of a local library?", ["to provide books and a place to read", "to repair roads", "to grow vegetables", "to treat patients"], 0, "Libraries provide books, information, and a quiet place to read."),
      ]),
    ],
  },
  {
    id: "unit-2-city-life",
    title: "Unit 2. City Life",
    summary:
      "Students learn language for describing city features, transport, advantages, disadvantages, and personal opinions about city life.",
    textbookScope: "Tiếng Anh 9 - Global Success",
    questionSets: [
      set("e2-set-1", "Bộ câu hỏi 1", [
        q("e2s1q1", "Choose the best word: Big cities often have heavy traffic ______.", ["congestion", "village", "friendship", "market"], 0, "Traffic congestion means too many vehicles causing slow movement."),
        q("e2s1q2", "Which place is usually found in a city, not a countryside area?", ["skyscraper", "rice field", "buffalo shed", "orchard"], 0, "A skyscraper is a very tall building commonly found in cities."),
        q("e2s1q3", "Choose the correct sentence.", ["There are many entertainment options in the city.", "There is many entertainment options in the city.", "There have many entertainment options in the city.", "There many entertainment options are in the city."], 0, "Use 'There are' with plural countable nouns."),
        q("e2s1q4", "City life can be convenient, ______ it can also be stressful.", ["but", "because", "so", "or"], 0, "The sentence contrasts two ideas, so 'but' is correct."),
        q("e2s1q5", "What is a common problem in big cities?", ["air pollution", "many rice fields", "quiet roads", "few schools"], 0, "Air pollution is a common urban problem."),
        q("e2s1q6", "Which transport is part of public transport?", ["bus", "private garden", "living room", "schoolbag"], 0, "A bus is a form of public transport."),
        q("e2s1q7", "The word 'crowded' is closest in meaning to ______.", ["full of people", "very clean", "completely empty", "full of trees"], 0, "Crowded means having many people in a place."),
        q("e2s1q8", "Choose the best answer: 'Why do many people move to cities?'", ["They want more jobs and services.", "They want fewer schools.", "They want slower internet.", "They want less transport."], 0, "People often move to cities for better jobs and services."),
        q("e2s1q9", "Which sentence expresses an opinion?", ["I think city life is exciting.", "The city has two train lines.", "The bus leaves at six.", "My school is near the park."], 0, "The phrase 'I think' clearly introduces an opinion."),
        q("e2s1q10", "Choose the correct comparative: 'City buildings are usually ______ than village houses.'", ["taller", "more tall", "tallest", "too tall"], 0, "For short adjectives like 'tall', use '-er': taller."),
      ]),
      set("e2-set-2", "Bộ câu hỏi 2", [
        q("e2s2q1", "A city with many offices, shops, and services is usually very ______.", ["busy", "empty", "tiny", "rural"], 0, "Busy is a common adjective for active cities."),
        q("e2s2q2", "Choose the best word: Many teenagers enjoy the city's cultural ______ like museums and theatres.", ["facilities", "vegetables", "animals", "mountains"], 0, "Museums and theatres are cultural facilities."),
        q("e2s2q3", "Which sentence is correct?", ["The underground is faster than the bus during rush hour.", "The underground fast than the bus during rush hour.", "The underground is fastest than the bus during rush hour.", "The underground more fast than the bus during rush hour."], 0, "Use the comparative form 'faster than'."),
        q("e2s2q4", "Rush hour is the time when ______.", ["roads are busiest", "people are sleeping", "shops are always closed", "the city is quiet"], 0, "Rush hour is the busiest part of the day for traffic."),
        q("e2s2q5", "Which is an advantage of city life?", ["more job opportunities", "fewer hospitals", "longer distances to services", "less entertainment"], 0, "Cities often offer more jobs."),
        q("e2s2q6", "Choose the best phrase: 'The city is noisy ______ night.'", ["at", "on", "in", "for"], 0, "We say 'at night'."),
        q("e2s2q7", "The opposite of 'modern' is ______.", ["old-fashioned", "crowded", "useful", "spacious"], 0, "Old-fashioned is the closest opposite here."),
        q("e2s2q8", "Which question matches the answer 'Because there are many parks and bike lanes'?", ["Why is the city becoming greener?", "Where is the city centre?", "How old is the city?", "Who built the city hall?"], 0, "The answer gives a reason, so ask with 'Why'."),
        q("e2s2q9", "Choose the best summary of city life.", ["It offers many opportunities but also causes stress.", "It is always quiet and simple.", "It has no traffic or pollution.", "It is exactly the same as village life."], 0, "This sentence presents a balanced summary of city life."),
        q("e2s2q10", "A person who travels to work every day is called a ______.", ["commuter", "tour guide", "chef", "coach"], 0, "A commuter regularly travels between home and work or school."),
      ]),
      set("e2-set-3", "Bộ câu hỏi 3", [
        q("e2s3q1", "Choose the correct sentence.", ["Living in the city can be expensive.", "Living in the city can expensive.", "Living in the city be expensive.", "Living in the city expensive can."], 0, "The sentence needs the verb 'be': can be expensive."),
        q("e2s3q2", "Which place helps people move around the city quickly?", ["metro station", "rice field", "waterfall", "cow shed"], 0, "A metro station is part of fast urban transport."),
        q("e2s3q3", "The word 'spacious' is closest in meaning to ______.", ["having a lot of space", "very noisy", "very crowded", "very dirty"], 0, "Spacious means large with plenty of room."),
        q("e2s3q4", "Which sentence compares two places correctly?", ["This street is quieter than the main road.", "This street is more quiet than the main road.", "This street quieter than the main road.", "This street is the quiet than the main road."], 0, "For short adjectives, use '-er than': quieter than."),
        q("e2s3q5", "What can reduce traffic congestion?", ["better public transport", "more private cars", "narrower roads everywhere", "fewer traffic rules"], 0, "Better public transport can reduce the number of private vehicles."),
        q("e2s3q6", "Choose the best response: 'Do you prefer city life or country life?'", ["I prefer city life because it is more convenient.", "It is next to the station.", "The city is in the north.", "I go there by bus."], 0, "The answer should clearly state a preference and reason."),
        q("e2s3q7", "A city with many trees and parks may have a better ______.", ["environment", "traffic jam", "noise level", "shopping mall"], 0, "Trees and parks improve the environment."),
        q("e2s3q8", "Which sentence gives a disadvantage of city life?", ["Housing costs are often very high.", "There are many libraries.", "People can find many jobs.", "Public transport is available."], 0, "High housing costs are a common disadvantage."),
        q("e2s3q9", "Choose the correct preposition: We arrived ______ the city centre at 8 a.m.", ["in", "on", "during", "with"], 0, "We say 'arrive in' for cities and countries."),
        q("e2s3q10", "Which title best fits a paragraph about transport, housing, and pollution in cities?", ["Challenges of city life", "My favourite sports", "A school timetable", "Traditional food recipes"], 0, "Those topics are all challenges of city life."),
      ]),
    ],
  },
  {
    id: "unit-3-healthy-living-for-teens",
    title: "Unit 3. Healthy Living for Teens",
    summary:
      "Students develop vocabulary and structures for healthy habits, routines, exercise, stress, and advice for teenagers.",
    textbookScope: "Tiếng Anh 9 - Global Success",
    questionSets: [
      set("e3-set-1", "Bộ câu hỏi 1", [
        q("e3s1q1", "Choose the healthiest habit.", ["Doing exercise regularly", "Skipping breakfast every day", "Sleeping four hours a night", "Drinking many fizzy drinks"], 0, "Regular exercise is a healthy habit."),
        q("e3s1q2", "Which sentence gives advice?", ["You should eat more vegetables.", "I ate vegetables yesterday.", "Vegetables are in the fridge.", "She is eating vegetables now."], 0, "Use 'should' to give advice."),
        q("e3s1q3", "The word 'balanced diet' refers to ______.", ["eating different healthy foods in the right amounts", "eating only sweets", "never eating breakfast", "drinking no water"], 0, "A balanced diet includes a variety of healthy foods."),
        q("e3s1q4", "Choose the correct sentence.", ["Teenagers need enough sleep to stay healthy.", "Teenagers need enough sleep stay healthy.", "Teenagers enough sleep need to stay healthy.", "Teenagers need enough sleep staying healthy."], 0, "The infinitive phrase is 'to stay healthy'."),
        q("e3s1q5", "Which activity can help reduce stress?", ["taking a short walk", "staying online all night", "skipping meals", "never talking to anyone"], 0, "Walking is a healthy way to relax and reduce stress."),
        q("e3s1q6", "Choose the correct word: Water is better ______ soft drinks for your health.", ["than", "from", "for", "with"], 0, "Use 'better than' to make comparisons."),
        q("e3s1q7", "Which meal should students not skip?", ["breakfast", "dessert", "snack", "salad"], 0, "Breakfast gives energy to start the day."),
        q("e3s1q8", "Choose the best response: 'How often do you work out?'", ["Three times a week.", "At the sports centre.", "With my brother.", "Because it is healthy."], 0, "The question asks about frequency."),
        q("e3s1q9", "The opposite of 'unhealthy' is ______.", ["healthy", "lazy", "tired", "late"], 0, "Healthy is the direct opposite."),
        q("e3s1q10", "Which sentence describes a habit?", ["She drinks enough water every day.", "She is drinking water now.", "She drank water yesterday morning.", "She will drink water tomorrow."], 0, "The present simple is used for habits."),
      ]),
      set("e3-set-2", "Bộ câu hỏi 2", [
        q("e3s2q1", "Choose the best word: A person who feels worried and under pressure may be ______.", ["stressed", "energetic", "calm", "fit"], 0, "Stressed means feeling pressure or worry."),
        q("e3s2q2", "Which sentence is correct?", ["You shouldn't stay up too late.", "You shouldn't to stay up too late.", "You don't should stay up too late.", "You shouldn't staying up too late."], 0, "After 'shouldn't', use the base verb."),
        q("e3s2q3", "What is a benefit of playing sports?", ["It helps keep your body fit.", "It always makes you ill.", "It removes the need for sleep.", "It is worse than no movement."], 0, "Sports help people stay fit and healthy."),
        q("e3s2q4", "Choose the best phrase: 'Too much fast food is bad ______ your health.'", ["for", "at", "into", "across"], 0, "We say 'bad for your health'."),
        q("e3s2q5", "Which is a symptom of tiredness?", ["lack of energy", "stronger muscles", "better concentration", "more free time"], 0, "Tired people often lack energy."),
        q("e3s2q6", "A good bedtime routine can help teenagers ______.", ["sleep better", "miss school more often", "eat less fruit", "forget exercise"], 0, "A routine before bed supports better sleep."),
        q("e3s2q7", "Choose the best answer: 'Why is exercise important for teens?'", ["It improves physical and mental health.", "It always wastes time.", "It is only for adults.", "It replaces healthy food."], 0, "Exercise supports both body and mind."),
        q("e3s2q8", "Which title fits a paragraph about sleep, food, and exercise?", ["Healthy habits for teens", "The history of a city", "How to take a bus", "Traditional crafts"], 0, "The paragraph is about healthy habits."),
        q("e3s2q9", "Choose the correct sentence.", ["My brother is healthier than me now.", "My brother is more healthy than me now.", "My brother healthier than me now.", "My brother is healthiest than me now."], 0, "In common usage, 'healthier than' is correct."),
        q("e3s2q10", "Which advice is the most suitable before an exam?", ["Take breaks and sleep enough.", "Play games all night.", "Skip breakfast.", "Drink only sweet drinks."], 0, "Rest and breaks help students perform better."),
      ]),
      set("e3-set-3", "Bộ câu hỏi 3", [
        q("e3s3q1", "Choose the healthiest drink.", ["water", "energy drink", "soft drink", "bubble tea every day"], 0, "Water is the healthiest everyday choice."),
        q("e3s3q2", "Which sentence gives negative advice?", ["You shouldn't spend too much time on your phone at night.", "You should walk to school.", "I usually go to bed early.", "They are exercising now."], 0, "Negative advice uses 'shouldn't'."),
        q("e3s3q3", "The phrase 'screen time' means ______.", ["time spent using phones, computers, or TVs", "time spent sleeping", "time spent walking outdoors", "time spent cooking dinner"], 0, "Screen time is time spent on digital screens."),
        q("e3s3q4", "What can happen if teens do not sleep enough?", ["They may feel tired and find it hard to focus.", "They become stronger immediately.", "They never feel stressed.", "They need less food forever."], 0, "Lack of sleep affects energy and concentration."),
        q("e3s3q5", "Choose the correct sentence.", ["Eating fruit every day is a good idea.", "Eat fruit every day is a good idea.", "Eating fruit every day are a good idea.", "Eating fruit every day good idea."], 0, "The gerund phrase works as the subject of the sentence."),
        q("e3s3q6", "Which habit is unhealthy?", ["eating too many snacks late at night", "going to bed on time", "cycling in the morning", "having breakfast"], 0, "Frequent late-night snacking is unhealthy."),
        q("e3s3q7", "Choose the best response: 'What should I do to stay fit?'", ["You should exercise and eat healthily.", "It is under the desk.", "I stayed home yesterday.", "At seven o'clock."], 0, "The answer should give suitable advice."),
        q("e3s3q8", "The word 'habit' means something you ______.", ["do regularly", "forget immediately", "buy once a year", "hide from others"], 0, "A habit is something done regularly."),
        q("e3s3q9", "Which sentence uses 'because' correctly?", ["I drink more water because it keeps me hydrated.", "Because I drink more water it keeps me hydrated because.", "I drink more water because keeps me hydrated.", "I because drink more water it keeps me hydrated."], 0, "The clause after 'because' should give a reason clearly."),
        q("e3s3q10", "What is the main message of a lesson on healthy living?", ["Small daily choices can improve teen health.", "Teens do not need routines.", "Fast food is always the best option.", "Exercise is only useful once a month."], 0, "Healthy living is built from regular good habits."),
      ]),
    ],
  },
  {
    id: "unit-4-remembering-the-past",
    title: "Unit 4. Remembering the Past",
    summary:
      "Students learn to describe past events, traditions, memories, and historical places while reviewing simple past language.",
    textbookScope: "Tiếng Anh 9 - Global Success",
    questionSets: [
      set("e4-set-1", "Bộ câu hỏi 1", [
        q("e4s1q1", "Choose the correct past form: 'My grandfather ______ in a small village when he was young.'", ["lived", "lives", "is living", "has lived"], 0, "Use the simple past to talk about finished events in the past."),
        q("e4s1q2", "Which phrase shows past time?", ["fifty years ago", "right now", "next week", "every day"], 0, "Ago is used to indicate time in the past."),
        q("e4s1q3", "Choose the best word: An old building that reminds people of history is a ______ site.", ["historic", "healthy", "modern", "crowded"], 0, "A historic site is an important place from the past."),
        q("e4s1q4", "Which sentence is correct?", ["People travelled by bicycle more often in the past.", "People travel by bicycle more often in the past yesterday.", "People by bicycle travelled in the past more often.", "People travelled by bicycle more often at the moment."], 0, "The simple past sentence is correct and natural."),
        q("e4s1q5", "The word 'memory' is closest in meaning to ______.", ["something you remember", "a future plan", "a school subject", "a kind of transport"], 0, "A memory is something remembered from the past."),
        q("e4s1q6", "Choose the correct sentence.", ["There were fewer cars in the town many years ago.", "There was fewer cars in the town many years ago.", "There are fewer cars in the town many years ago.", "There were less car in the town many years ago."], 0, "Use 'There were' with plural nouns in the past."),
        q("e4s1q7", "Which question fits the answer 'They used oil lamps at night'?", ["How did people light their homes in the past?", "Where do people sleep now?", "Why are oil lamps expensive?", "Who buys lamps today?"], 0, "The answer explains a past habit."),
        q("e4s1q8", "Choose the best word: A story passed from older people to younger people is often a family ______.", ["tradition", "ticket", "station", "schedule"], 0, "Tradition refers to customs or ways passed down over time."),
        q("e4s1q9", "Which sentence expresses comparison between past and present?", ["Life is more comfortable now than in the past.", "My father is at home now.", "The museum opens at nine.", "We like old photos."], 0, "The sentence compares now and the past."),
        q("e4s1q10", "What can old photos help people do?", ["remember the past", "cook better meals", "learn to drive", "buy train tickets"], 0, "Old photos often help people remember past events and people."),
      ]),
      set("e4-set-2", "Bộ câu hỏi 2", [
        q("e4s2q1", "Choose the correct form: 'My mother ______ me stories about her childhood last night.'", ["told", "tells", "is telling", "tell"], 0, "Last night shows the past, so use 'told'."),
        q("e4s2q2", "Which word describes something from a long time ago?", ["ancient", "crowded", "daily", "healthy"], 0, "Ancient means very old or from a distant past."),
        q("e4s2q3", "Choose the best answer: 'Why do people visit historical museums?'", ["To learn about the past.", "To catch a train.", "To buy medicine.", "To practise football."], 0, "Museums help people learn about history."),
        q("e4s2q4", "Which sentence is grammatically correct?", ["My grandparents didn't have smartphones when they were young.", "My grandparents didn't had smartphones when they were young.", "My grandparents not have smartphones when they were young.", "My grandparents didn't having smartphones when they were young."], 0, "After 'didn't', use the base verb."),
        q("e4s2q5", "The opposite of 'modern life' is ______.", ["traditional life", "healthy food", "public transport", "busy city"], 0, "Traditional life contrasts with modern life."),
        q("e4s2q6", "Choose the best phrase: 'In the past, children often played ______ outdoors.'", ["games", "traffic", "advice", "history"], 0, "Games is the natural choice here."),
        q("e4s2q7", "What does 'used to' often talk about?", ["past habits and states", "future plans", "commands", "present feelings only"], 0, "'Used to' describes repeated actions or states in the past."),
        q("e4s2q8", "Which sentence uses 'used to' correctly?", ["People used to write letters by hand.", "People use to wrote letters by hand.", "People used to wrote letters by hand.", "People used writing letters by hand."], 0, "After 'used to', use the base verb."),
        q("e4s2q9", "Choose the most suitable title.", ["What life was like in the past", "My favourite modern gadgets", "A trip to the zoo tomorrow", "Healthy snacks for teens"], 0, "The title should match the topic of life in the past."),
        q("e4s2q10", "Which item is closely connected with the past?", ["a black-and-white family photo", "a mobile app update", "a city bus card", "an online game level"], 0, "A black-and-white family photo usually represents an earlier time."),
      ]),
      set("e4-set-3", "Bộ câu hỏi 3", [
        q("e4s3q1", "Choose the correct sentence.", ["People walked more and drove less in the past.", "People walk more and drove less in the past.", "People walked more and drive less in the past.", "People walking more and drove less in the past."], 0, "The whole sentence should stay in the past tense."),
        q("e4s3q2", "Which phrase means 'think about old times'?", ["look back", "wake up", "set off", "turn down"], 0, "Look back means remember or think about the past."),
        q("e4s3q3", "Choose the best answer: 'How was life different in the past?'", ["People had fewer modern machines.", "People travel to school by bus today.", "Cities are crowded now.", "The lesson starts at eight."], 0, "The answer should describe a past difference."),
        q("e4s3q4", "A person who remembers many old events may share useful ______.", ["stories", "traffic lights", "timetables", "menus"], 0, "Stories are commonly shared memories of the past."),
        q("e4s3q5", "Which word best completes the sentence? 'The old bridge is an important part of the town's ______.'", ["history", "breakfast", "exercise", "transport"], 0, "A historic structure is part of a town's history."),
        q("e4s3q6", "Choose the correct preposition: My grandmother often talks ______ her school days.", ["about", "under", "through", "between"], 0, "We say 'talk about' a topic."),
        q("e4s3q7", "Which sentence asks about past habits?", ["What did children do for fun in the past?", "What are children doing now?", "Why is the park closed?", "Where is the museum?"], 0, "The question uses the past and asks about repeated past actions."),
        q("e4s3q8", "The phrase 'preserve traditions' means ______.", ["keep traditions alive", "forget old customs", "change everything quickly", "stop family events"], 0, "Preserve means protect and keep."),
        q("e4s3q9", "Choose the best response: 'Did your father use to walk to school?'", ["Yes, he did.", "Yes, he does.", "Yes, he is.", "Yes, he can."], 0, "Simple past yes/no questions use 'did'."),
        q("e4s3q10", "What is the main idea of remembering the past?", ["It helps people understand change over time.", "It stops people from learning new things.", "It means ignoring the present.", "It is only about old buildings."], 0, "Remembering the past helps people understand change and identity."),
      ]),
    ],
  },
  {
    id: "unit-5-our-experiences",
    title: "Unit 5. Our Experiences",
    summary:
      "Students practise talking about personal experiences, trips, events, and what they have learned from them.",
    textbookScope: "Tiếng Anh 9 - Global Success",
    questionSets: [
      set("e5-set-1", "Bộ câu hỏi 1", [
        q("e5s1q1", "Choose the best word: Climbing a mountain for the first time can be an unforgettable ______.", ["experience", "station", "village", "vegetable"], 0, "An experience is something that happens to you and is remembered."),
        q("e5s1q2", "Which sentence is correct?", ["I have visited Da Nang twice.", "I have visit Da Nang twice.", "I has visited Da Nang twice.", "I visited Da Nang twice now."], 0, "Use 'have + past participle' with 'I'."),
        q("e5s1q3", "The phrase 'learn from' means ______.", ["gain knowledge from something", "forget quickly", "travel without reason", "watch from far away"], 0, "To learn from an experience is to gain understanding from it."),
        q("e5s1q4", "Choose the best response: 'Have you ever tried kayaking?'", ["Yes, I have. It was exciting.", "Yes, I do every Tuesday yesterday.", "Yes, I am trying.", "Yes, I can a boat."], 0, "Present perfect questions take short answers with 'have'."),
        q("e5s1q5", "Which word best describes a trip that is full of fun and new things?", ["memorable", "empty", "silent", "ordinary-looking"], 0, "Memorable means worth remembering."),
        q("e5s1q6", "Choose the correct form: 'She ______ never ______ sushi before.'", ["has / eaten", "have / eaten", "has / eat", "is / eaten"], 0, "Use 'has eaten' with third-person singular subjects."),
        q("e5s1q7", "Which question asks about life experience?", ["Have you ever spoken to a foreign visitor?", "Do you speak to a foreign visitor now?", "Did you ever speaking to a foreign visitor?", "Will you ever spoke to a foreign visitor?"], 0, "Use 'Have you ever + past participle' to ask about experiences."),
        q("e5s1q8", "The opposite of 'successful' is ______.", ["unsuccessful", "interesting", "careful", "hopeful"], 0, "Unsuccessful is the opposite of successful."),
        q("e5s1q9", "Choose the best answer: 'Why are experiences important for teenagers?'", ["They help teens become more confident and independent.", "They make teens stop learning.", "They remove all challenges.", "They are only useful in books."], 0, "Experiences often help teens grow in confidence and independence."),
        q("e5s1q10", "Which sentence talks about a result up to now?", ["I have learned a lot from volunteering.", "I learn a lot from volunteering yesterday.", "I am learning a lot last year.", "I learned a lot now."], 0, "The present perfect links past action to the present result."),
      ]),
      set("e5-set-2", "Bộ câu hỏi 2", [
        q("e5s2q1", "Choose the correct sentence.", ["We have taken part in many school activities this year.", "We have took part in many school activities this year.", "We has taken part in many school activities this year.", "We have taking part in many school activities this year."], 0, "Use 'have taken part' with 'we'."),
        q("e5s2q2", "What is an adventure?", ["an exciting and sometimes challenging experience", "a quiet homework task", "a normal school bell", "a list of vegetables"], 0, "An adventure is exciting and often challenging."),
        q("e5s2q3", "Choose the correct word: My trip to Hue was a valuable learning ______.", ["experience", "pollution", "direction", "neighbourhood"], 0, "Experience fits naturally with learning."),
        q("e5s2q4", "Which sentence uses the present perfect correctly?", ["He has never ridden a horse before.", "He has never rode a horse before.", "He never has ridden a horse before did.", "He is never ridden a horse before."], 0, "The correct form is 'has ridden'."),
        q("e5s2q5", "Choose the best ending: 'After joining the project, I became ______.'", ["more confident", "more afraid of every task", "less interested in learning anything", "unable to work with others"], 0, "Positive experiences often build confidence."),
        q("e5s2q6", "Which answer fits: 'What have you learned from the trip?'", ["I have learned how to work with my friends.", "I went there by coach.", "It was in July.", "The hotel was near the beach."], 0, "The question asks about lessons learned, not travel details."),
        q("e5s2q7", "The word 'challenge' is closest in meaning to ______.", ["something difficult that tests you", "a simple meal", "a free holiday", "a short nap"], 0, "A challenge is something difficult to deal with."),
        q("e5s2q8", "Choose the correct phrase: 'She has made many new friends ______ joining the club.'", ["by", "for", "under", "during to"], 0, "Use 'by + V-ing' to show method."),
        q("e5s2q9", "Which title best matches a paragraph about camping, teamwork, and confidence?", ["What I gained from a camping experience", "How to cook noodles", "City transport today", "My favourite school building"], 0, "The title should reflect experience and personal growth."),
        q("e5s2q10", "What can students gain from volunteering?", ["practical skills and empathy", "more pollution", "less confidence forever", "fewer friendships"], 0, "Volunteering can build both skills and empathy."),
      ]),
      set("e5-set-3", "Bộ câu hỏi 3", [
        q("e5s3q1", "Choose the best word: A trip can broaden your ______ of the world.", ["understanding", "traffic", "noise", "timetable"], 0, "Experiences can broaden understanding."),
        q("e5s3q2", "Which sentence is correct?", ["Have you ever worked in a team project?", "Did you ever worked in a team project?", "Have you ever work in a team project?", "Do you ever worked in a team project?"], 0, "Use 'Have you ever + past participle'."),
        q("e5s3q3", "Choose the best answer: 'Why do people keep travel journals?'", ["To remember and reflect on their experiences.", "To avoid all new experiences.", "To forget what happened.", "To practise only grammar rules."], 0, "Travel journals help people remember and reflect."),
        q("e5s3q4", "The phrase 'step out of your comfort zone' means ______.", ["try something new and difficult", "sleep more every day", "stay at home all the time", "avoid learning"], 0, "It means doing something unfamiliar or challenging."),
        q("e5s3q5", "Choose the correct sentence.", ["I have not forgotten that special day.", "I have not forget that special day.", "I has not forgotten that special day.", "I have not forgot that special day."], 0, "The past participle of 'forget' is 'forgotten'."),
        q("e5s3q6", "Which experience would most likely improve teamwork?", ["working on a group project", "watching TV alone", "sleeping late", "eating lunch quietly"], 0, "A group project requires teamwork."),
        q("e5s3q7", "Choose the best response: 'Was the trip worth it?'", ["Yes, I learned a lot from it.", "It started at six o'clock.", "It was next to the station.", "My brother likes maths."], 0, "The answer should evaluate the trip."),
        q("e5s3q8", "The word 'reflect' in learning means ______.", ["think carefully about something", "run very fast", "close a window", "draw a city map"], 0, "Reflect means think deeply about an experience or idea."),
        q("e5s3q9", "Which sentence shows a lesson learned?", ["Now I know how important preparation is.", "The bus arrived late.", "We stayed in a hotel.", "The trip was in April."], 0, "The sentence explains a lesson or realization."),
        q("e5s3q10", "What is the main idea of this unit?", ["Experiences can teach valuable life lessons.", "Experiences are only about expensive travel.", "Only adults can learn from experiences.", "Past experiences never affect the present."], 0, "The key message is that experiences help people grow and learn."),
      ]),
    ],
  },
];

const englishChapterModeContent: Record<string, EnglishChapterModeContent> = {
  "unit-1-local-community": {
    learn: {
      overview:
        "Unit 1 helps students talk about places, people, and useful services in the local community while practising basic location language and present simple structures.",
      keyIdeas: [
        "Recognise common places and services in a local community.",
        "Ask for and describe locations with clear prepositions.",
        "Talk about useful community activities and volunteering.",
        "Use the present simple to describe routines and facts.",
      ],
    },
    review: {
      checklist: [
        "I can name important places in my neighbourhood in English.",
        "I can describe where a place is using location words.",
        "I can explain how students can help the local community.",
      ],
      quickPrompts: [
        "What three places are most useful in your neighbourhood?",
        "How can teenagers improve their local community?",
      ],
    },
  },
  "unit-2-city-life": {
    learn: {
      overview:
        "Unit 2 gives students language for describing city life, transport, convenience, noise, pollution, and personal opinions about living in a city.",
      keyIdeas: [
        "Learn vocabulary about transport, buildings, and urban life.",
        "Compare city life with other places using comparative forms.",
        "Discuss both advantages and disadvantages of city life.",
        "Express and support simple personal opinions.",
      ],
    },
    review: {
      checklist: [
        "I can describe common city problems and city advantages.",
        "I can use comparative adjectives correctly.",
        "I can give an opinion about city life with a reason.",
      ],
      quickPrompts: [
        "What makes city life convenient for teenagers?",
        "What can a city do to reduce traffic congestion?",
      ],
    },
  },
  "unit-3-healthy-living-for-teens": {
    learn: {
      overview:
        "Unit 3 focuses on healthy habits for teenagers, including food, sleep, exercise, stress, and useful advice with should / shouldn't.",
      keyIdeas: [
        "Use vocabulary for healthy habits and daily routines.",
        "Give advice with should and shouldn't.",
        "Explain how exercise, sleep, and food affect teen health.",
        "Describe healthy and unhealthy choices clearly.",
      ],
    },
    review: {
      checklist: [
        "I can give health advice in English.",
        "I can explain why sleep and exercise matter for teens.",
        "I can identify healthy and unhealthy habits.",
      ],
      quickPrompts: [
        "What healthy habit should teens build first?",
        "How can students reduce stress before exams?",
      ],
    },
  },
  "unit-4-remembering-the-past": {
    learn: {
      overview:
        "Unit 4 helps students describe past life, traditions, memories, and historical places while reviewing the simple past and used to.",
      keyIdeas: [
        "Talk about life in the past with suitable time expressions.",
        "Use the simple past and used to correctly.",
        "Describe traditions, memories, and historic places.",
        "Compare the past with the present in simple English.",
      ],
    },
    review: {
      checklist: [
        "I can describe at least two differences between past and present life.",
        "I can use the simple past and used to correctly.",
        "I can talk about a family memory or a historic place.",
      ],
      quickPrompts: [
        "What was different about daily life in the past?",
        "Why is it important to preserve traditions?",
      ],
    },
  },
  "unit-5-our-experiences": {
    learn: {
      overview:
        "Unit 5 teaches students to talk about personal experiences, trips, projects, and lessons learned, especially with the present perfect.",
      keyIdeas: [
        "Use present perfect to ask and answer about experiences.",
        "Describe memorable activities and what was learned from them.",
        "Talk about teamwork, confidence, and personal growth.",
        "Reflect on experiences using simple, clear English.",
      ],
    },
    review: {
      checklist: [
        "I can ask about life experiences with Have you ever...?",
        "I can describe a meaningful experience and what I learned.",
        "I can use present perfect forms more accurately.",
      ],
      quickPrompts: [
        "What experience has helped you grow the most?",
        "Why can volunteering or travel be a good learning experience?",
      ],
    },
  },
};

export function getEnglishChapterById(chapterId: string) {
  return grade9EnglishChapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function getEnglishChapterModeContent(chapterId: string) {
  return englishChapterModeContent[chapterId] ?? null;
}
