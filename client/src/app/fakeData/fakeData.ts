type User = {
  userID: number;
  username: string;
  email: string;
  password_hash: string;
};

type Message = {
  messageID: number;
  senderID: number;
  content: string;
  sent_at: string;
};

type Group = {
  groupID: number;
  group_name: string;
  created_at: string;
};

type UserGroup = {
  userID: number;
  groupID: number;
};

type GroupMessage = {
  messageID: number;
  groupID: number;
};

const users: User[] = [
  {
    userID: 1,
    username: "John Doe",
    email: "john.doe@example.com",
    password_hash: "hash1",
  },
  {
    userID: 2,
    username: "Jane Smith",
    email: "jane.smith@example.com",
    password_hash: "hash2",
  },
  {
    userID: 3,
    username: "Alice Johnson",
    email: "alice.johnson@example.com",
    password_hash: "hash3",
  },
  {
    userID: 4,
    username: "Robert Brown",
    email: "robert.brown@example.com",
    password_hash: "hash4",
  },
  {
    userID: 5,
    username: "Emily Davis",
    email: "emily.davis@example.com",
    password_hash: "hash5",
  },
  {
    userID: 6,
    username: "William Miller",
    email: "william.miller@example.com",
    password_hash: "hash6",
  },
  {
    userID: 7,
    username: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    password_hash: "hash7",
  },
  {
    userID: 8,
    username: "James Moore",
    email: "james.moore@example.com",
    password_hash: "hash8",
  },
  {
    userID: 9,
    username: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    password_hash: "hash9",
  },
  {
    userID: 10,
    username: "Benjamin Anderson",
    email: "ben.anderson@example.com",
    password_hash: "hash10",
  },
  {
    userID: 11,
    username: "Charlotte Thomas",
    email: "charlotte.thomas@example.com",
    password_hash: "hash11",
  },
  {
    userID: 12,
    username: "Lucas Jackson",
    email: "lucas.jackson@example.com",
    password_hash: "hash12",
  },
  {
    userID: 13,
    username: "Amelia White",
    email: "amelia.white@example.com",
    password_hash: "hash13",
  },
  {
    userID: 14,
    username: "Mason Harris",
    email: "mason.harris@example.com",
    password_hash: "hash14",
  },
  {
    userID: 15,
    username: "Ava Martin",
    email: "ava.martin@example.com",
    password_hash: "hash15",
  },
  {
    userID: 16,
    username: "Ethan Thompson",
    email: "ethan.thompson@example.com",
    password_hash: "hash16",
  },
  {
    userID: 17,
    username: "Isabella Garcia",
    email: "isabella.garcia@example.com",
    password_hash: "hash17",
  },
  {
    userID: 18,
    username: "Alexander Martinez",
    email: "alex.martinez@example.com",
    password_hash: "hash18",
  },
  {
    userID: 19,
    username: "Mia Robinson",
    email: "mia.robinson@example.com",
    password_hash: "hash19",
  },
  {
    userID: 20,
    username: "Daniel Clark",
    email: "daniel.clark@example.com",
    password_hash: "hash20",
  },
  {
    userID: 21,
    username: "Abigail Rodriguez",
    email: "abigail.rodriguez@example.com",
    password_hash: "hash21",
  },
  {
    userID: 22,
    username: "Matthew Lewis",
    email: "matthew.lewis@example.com",
    password_hash: "hash22",
  },
  {
    userID: 23,
    username: "Harper Lee",
    email: "harper.lee@example.com",
    password_hash: "hash23",
  },
  {
    userID: 24,
    username: "Joseph Walker",
    email: "joseph.walker@example.com",
    password_hash: "hash24",
  },
  {
    userID: 25,
    username: "Evelyn Hall",
    email: "evelyn.hall@example.com",
    password_hash: "hash25",
  },
];

const messages: Message[] = [
  {
    messageID: 1,
    senderID: 1,
    content: "Welcome to the Developers chat!",
    sent_at: "2024-02-01T10:00:00Z",
  },
  {
    messageID: 2,
    senderID: 2,
    content: "Hi everyone!",
    sent_at: "2024-02-01T10:02:00Z",
  },
  {
    messageID: 3,
    senderID: 3,
    content: "Let's collaborate on the new project.",
    sent_at: "2024-02-01T10:04:00Z",
  },
  {
    messageID: 4,
    senderID: 1,
    content: "Don't forget to push your code.",
    sent_at: "2024-02-01T10:06:00Z",
  },
  {
    messageID: 5,
    senderID: 4,
    content: "Code review completed.",
    sent_at: "2024-02-01T10:08:00Z",
  },
  {
    messageID: 6,
    senderID: 5,
    content: "Merging my branch now.",
    sent_at: "2024-02-01T10:10:00Z",
  },
  {
    messageID: 7,
    senderID: 1,
    content: "Great work team!",
    sent_at: "2024-02-01T10:12:00Z",
  },
  {
    messageID: 8,
    senderID: 6,
    content: "Deployment is scheduled.",
    sent_at: "2024-02-01T10:14:00Z",
  },
  {
    messageID: 9,
    senderID: 1,
    content: "Welcome to the Designers chat!",
    sent_at: "2024-02-02T11:00:00Z",
  },
  {
    messageID: 10,
    senderID: 7,
    content: "Excited to share my ideas.",
    sent_at: "2024-02-02T11:02:00Z",
  },
  {
    messageID: 11,
    senderID: 8,
    content: "Let's get creative!",
    sent_at: "2024-02-02T11:04:00Z",
  },
  {
    messageID: 12,
    senderID: 1,
    content: "Remember to follow the brand guide.",
    sent_at: "2024-02-02T11:06:00Z",
  },
  {
    messageID: 13,
    senderID: 9,
    content: "New mockups are ready.",
    sent_at: "2024-02-02T11:08:00Z",
  },
  {
    messageID: 14,
    senderID: 10,
    content: "I like the new color scheme.",
    sent_at: "2024-02-02T11:10:00Z",
  },
  {
    messageID: 15,
    senderID: 1,
    content: "Please share your drafts.",
    sent_at: "2024-02-02T11:12:00Z",
  },
  {
    messageID: 16,
    senderID: 11,
    content: "Uploading my sketches now.",
    sent_at: "2024-02-02T11:14:00Z",
  },
  {
    messageID: 17,
    senderID: 1,
    content: "Welcome to the Marketing chat!",
    sent_at: "2024-02-03T12:00:00Z",
  },
  {
    messageID: 18,
    senderID: 12,
    content: "Let's boost our campaign.",
    sent_at: "2024-02-03T12:02:00Z",
  },
  {
    messageID: 19,
    senderID: 13,
    content: "Social media is on fire!",
    sent_at: "2024-02-03T12:04:00Z",
  },
  {
    messageID: 20,
    senderID: 1,
    content: "Focus on audience engagement.",
    sent_at: "2024-02-03T12:06:00Z",
  },
  {
    messageID: 21,
    senderID: 14,
    content: "Preparing the analytics report.",
    sent_at: "2024-02-03T12:08:00Z",
  },
  {
    messageID: 22,
    senderID: 15,
    content: "Let's target the right demographics.",
    sent_at: "2024-02-03T12:10:00Z",
  },
  {
    messageID: 23,
    senderID: 1,
    content: "Remember to check the conversion rates.",
    sent_at: "2024-02-03T12:12:00Z",
  },
  {
    messageID: 24,
    senderID: 16,
    content: "Campaign metrics updated.",
    sent_at: "2024-02-03T12:14:00Z",
  },
  {
    messageID: 25,
    senderID: 1,
    content: "Welcome to the Management chat!",
    sent_at: "2024-02-04T13:00:00Z",
  },
  {
    messageID: 26,
    senderID: 17,
    content: "Let's align our quarterly goals.",
    sent_at: "2024-02-04T13:02:00Z",
  },
  {
    messageID: 27,
    senderID: 18,
    content: "Strategy meeting at 2 PM.",
    sent_at: "2024-02-04T13:04:00Z",
  },
  {
    messageID: 28,
    senderID: 1,
    content: "Ensure all teams are updated.",
    sent_at: "2024-02-04T13:06:00Z",
  },
  {
    messageID: 29,
    senderID: 19,
    content: "I've shared the dashboard.",
    sent_at: "2024-02-04T13:08:00Z",
  },
  {
    messageID: 30,
    senderID: 20,
    content: "I'll circulate the meeting notes.",
    sent_at: "2024-02-04T13:10:00Z",
  },
  {
    messageID: 31,
    senderID: 1,
    content: "Great progress, everyone.",
    sent_at: "2024-02-04T13:12:00Z",
  },
  {
    messageID: 32,
    senderID: 21,
    content: "Meeting adjourned.",
    sent_at: "2024-02-04T13:14:00Z",
  },
  {
    messageID: 33,
    senderID: 1,
    content: "Welcome to the QA Team chat!",
    sent_at: "2024-02-05T14:00:00Z",
  },
  {
    messageID: 34,
    senderID: 22,
    content: "Starting regression tests.",
    sent_at: "2024-02-05T14:02:00Z",
  },
  {
    messageID: 35,
    senderID: 23,
    content: "Discovered an issue in module 3.",
    sent_at: "2024-02-05T14:04:00Z",
  },
  {
    messageID: 36,
    senderID: 1,
    content: "Please log and assign the bug.",
    sent_at: "2024-02-05T14:06:00Z",
  },
  {
    messageID: 37,
    senderID: 24,
    content: "Bug has been recorded.",
    sent_at: "2024-02-05T14:08:00Z",
  },
  {
    messageID: 38,
    senderID: 25,
    content: "Updating the test cases now.",
    sent_at: "2024-02-05T14:10:00Z",
  },
  {
    messageID: 39,
    senderID: 1,
    content: "Ensure all bugs are fixed.",
    sent_at: "2024-02-05T14:12:00Z",
  },
  {
    messageID: 40,
    senderID: 2,
    content: "Regression testing complete.",
    sent_at: "2024-02-05T14:14:00Z",
  },
  {
    messageID: 41,
    senderID: 1,
    content: "Welcome to the Support chat!",
    sent_at: "2024-02-06T15:00:00Z",
  },
  {
    messageID: 42,
    senderID: 3,
    content: "Ticket #2345 has been created.",
    sent_at: "2024-02-06T15:02:00Z",
  },
  {
    messageID: 43,
    senderID: 4,
    content: "Assigning ticket #2345 now.",
    sent_at: "2024-02-06T15:04:00Z",
  },
  {
    messageID: 44,
    senderID: 1,
    content: "Please follow up on ticket #2345.",
    sent_at: "2024-02-06T15:06:00Z",
  },
  {
    messageID: 45,
    senderID: 5,
    content: "Ticket resolved.",
    sent_at: "2024-02-06T15:08:00Z",
  },
  {
    messageID: 46,
    senderID: 6,
    content: "Good job team!",
    sent_at: "2024-02-06T15:10:00Z",
  },
  {
    messageID: 47,
    senderID: 1,
    content: "Moving on to the next ticket.",
    sent_at: "2024-02-06T15:12:00Z",
  },
  {
    messageID: 48,
    senderID: 7,
    content: "Ticket closed.",
    sent_at: "2024-02-06T15:14:00Z",
  },
  {
    messageID: 81,
    senderID: 1,
    content: "Let's discuss the new sales strategy.",
    sent_at: "2024-02-11T18:00:00Z",
  },
  {
    messageID: 82,
    senderID: 14,
    content: "We need to focus on customer retention.",
    sent_at: "2024-02-11T18:02:00Z",
  },
  {
    messageID: 83,
    senderID: 15,
    content: "We've received positive feedback from our recent campaign.",
    sent_at: "2024-02-11T18:04:00Z",
  },
  {
    messageID: 84,
    senderID: 1,
    content: "That's great, let's leverage it in our next pitch.",
    sent_at: "2024-02-11T18:06:00Z",
  },
  {
    messageID: 85,
    senderID: 16,
    content: "I'll prepare a report on lead conversion rates.",
    sent_at: "2024-02-11T18:08:00Z",
  },
  {
    messageID: 86,
    senderID: 17,
    content: "We need a more targeted outreach to specific sectors.",
    sent_at: "2024-02-11T18:10:00Z",
  },
  {
    messageID: 87,
    senderID: 1,
    content: "Agreed, let's refine the strategy and focus on key industries.",
    sent_at: "2024-02-11T18:12:00Z",
  },
  {
    messageID: 88,
    senderID: 18,
    content: "I'll update the outreach plan based on this feedback.",
    sent_at: "2024-02-11T18:14:00Z",
  },
  {
    messageID: 89,
    senderID: 1,
    content: "Let's discuss the new product roadmap.",
    sent_at: "2024-02-12T17:00:00Z",
  },
  {
    messageID: 90,
    senderID: 24,
    content: "The design team has shared the final product mockups.",
    sent_at: "2024-02-12T17:02:00Z",
  },
  {
    messageID: 91,
    senderID: 25,
    content: "We need to integrate customer feedback into the product design.",
    sent_at: "2024-02-12T17:04:00Z",
  },
  {
    messageID: 92,
    senderID: 1,
    content: "Agreed, let's iterate on the prototype based on that feedback.",
    sent_at: "2024-02-12T17:06:00Z",
  },
  {
    messageID: 93,
    senderID: 2,
    content: "I’ll help with gathering the necessary feedback from users.",
    sent_at: "2024-02-12T17:08:00Z",
  },
  {
    messageID: 94,
    senderID: 3,
    content: "I'll start drafting the user personas for the next phase.",
    sent_at: "2024-02-12T17:10:00Z",
  },
  {
    messageID: 95,
    senderID: 1,
    content: "Great, let’s keep the momentum going.",
    sent_at: "2024-02-12T17:12:00Z",
  },
  {
    messageID: 96,
    senderID: 10,
    content: "I’ll review the market research for next steps.",
    sent_at: "2024-02-12T17:14:00Z",
  },
  {
    messageID: 97,
    senderID: 1,
    content: "Let's review the latest HR policies.",
    sent_at: "2024-02-13T19:00:00Z",
  },
  {
    messageID: 98,
    senderID: 20,
    content: "The new employee handbook has been finalized.",
    sent_at: "2024-02-13T19:02:00Z",
  },
  {
    messageID: 99,
    senderID: 21,
    content: "All new hires will need to sign the updated document.",
    sent_at: "2024-02-13T19:04:00Z",
  },
  {
    messageID: 100,
    senderID: 1,
    content: "Let's ensure everyone is aware of the updated guidelines.",
    sent_at: "2024-02-13T19:06:00Z",
  },
  {
    messageID: 101,
    senderID: 22,
    content: "I'll send out the new policies to all staff members.",
    sent_at: "2024-02-13T19:08:00Z",
  },
  {
    messageID: 102,
    senderID: 23,
    content: "I'll schedule an orientation for new employees.",
    sent_at: "2024-02-13T19:10:00Z",
  },
  {
    messageID: 103,
    senderID: 1,
    content: "Please ensure all paperwork is completed before orientation.",
    sent_at: "2024-02-13T19:12:00Z",
  },
  {
    messageID: 104,
    senderID: 24,
    content: "Orientation materials are ready for review.",
    sent_at: "2024-02-13T19:14:00Z",
  },
  {
    messageID: 105,
    senderID: 1,
    content: "Let's review the operations plan for Q2.",
    sent_at: "2024-02-14T20:00:00Z",
  },
  {
    messageID: 106,
    senderID: 25,
    content: "We have updated the quarterly operations report.",
    sent_at: "2024-02-14T20:02:00Z",
  },
  {
    messageID: 107,
    senderID: 26,
    content: "We should focus on improving the efficiency of our supply chain.",
    sent_at: "2024-02-14T20:04:00Z",
  },
  {
    messageID: 108,
    senderID: 1,
    content: "Agreed, let's start implementing the changes next week.",
    sent_at: "2024-02-14T20:06:00Z",
  },
  {
    messageID: 109,
    senderID: 27,
    content: "I’ll prepare a breakdown of the process improvements.",
    sent_at: "2024-02-14T20:08:00Z",
  },
  {
    messageID: 110,
    senderID: 28,
    content: "I'll help gather data from the teams to support these changes.",
    sent_at: "2024-02-14T20:10:00Z",
  },
  {
    messageID: 111,
    senderID: 1,
    content: "Please make sure to share the final data with the team.",
    sent_at: "2024-02-14T20:12:00Z",
  },
  {
    messageID: 112,
    senderID: 29,
    content: "Everything is set for implementation next week.",
    sent_at: "2024-02-14T20:14:00Z",
  },
];

const groups: Group[] = [
  { groupID: 1, group_name: "Developers", created_at: "2023-12-01T09:00:00Z" },
  { groupID: 2, group_name: "Designers", created_at: "2023-12-02T09:00:00Z" },
  { groupID: 3, group_name: "Marketing", created_at: "2023-12-03T09:00:00Z" },
  { groupID: 4, group_name: "Management", created_at: "2023-12-04T09:00:00Z" },
  { groupID: 5, group_name: "QA Team", created_at: "2023-12-05T09:00:00Z" },
  { groupID: 6, group_name: "Support", created_at: "2023-12-06T09:00:00Z" },
  { groupID: 7, group_name: "Product", created_at: "2023-12-07T09:00:00Z" },
  { groupID: 8, group_name: "Sales", created_at: "2023-12-08T09:00:00Z" },
  { groupID: 9, group_name: "HR", created_at: "2023-12-09T09:00:00Z" },
  { groupID: 10, group_name: "Operations", created_at: "2023-12-10T09:00:00Z" },
];

const userGroups: UserGroup[] = [
  { userID: 1, groupID: 1 },
  { userID: 2, groupID: 1 },
  { userID: 3, groupID: 1 },
  { userID: 4, groupID: 1 },
  { userID: 5, groupID: 1 },
  { userID: 1, groupID: 2 },
  { userID: 6, groupID: 2 },
  { userID: 7, groupID: 2 },
  { userID: 8, groupID: 2 },
  { userID: 9, groupID: 2 },
  { userID: 1, groupID: 3 },
  { userID: 10, groupID: 3 },
  { userID: 11, groupID: 3 },
  { userID: 12, groupID: 3 },
  { userID: 13, groupID: 3 },
  { userID: 1, groupID: 4 },
  { userID: 14, groupID: 4 },
  { userID: 15, groupID: 4 },
  { userID: 16, groupID: 4 },
  { userID: 17, groupID: 4 },
  { userID: 1, groupID: 5 },
  { userID: 18, groupID: 5 },
  { userID: 19, groupID: 5 },
  { userID: 20, groupID: 5 },
  { userID: 1, groupID: 6 },
  { userID: 21, groupID: 6 },
  { userID: 22, groupID: 6 },
  { userID: 23, groupID: 6 },
  { userID: 1, groupID: 7 },
  { userID: 24, groupID: 7 },
  { userID: 25, groupID: 7 },
  { userID: 2, groupID: 7 },
  { userID: 1, groupID: 8 },
  { userID: 3, groupID: 8 },
  { userID: 5, groupID: 8 },
  { userID: 7, groupID: 8 },
  { userID: 1, groupID: 9 },
  { userID: 4, groupID: 9 },
  { userID: 6, groupID: 9 },
  { userID: 8, groupID: 9 },
  { userID: 1, groupID: 10 },
  { userID: 9, groupID: 10 },
  { userID: 11, groupID: 10 },
  { userID: 13, groupID: 10 },
];

const groupMessages: GroupMessage[] = [
  { messageID: 1, groupID: 1 },
  { messageID: 2, groupID: 1 },
  { messageID: 3, groupID: 1 },
  { messageID: 4, groupID: 1 },
  { messageID: 5, groupID: 1 },
  { messageID: 6, groupID: 1 },
  { messageID: 7, groupID: 1 },
  { messageID: 8, groupID: 1 },
  { messageID: 9, groupID: 2 },
  { messageID: 10, groupID: 2 },
  { messageID: 11, groupID: 2 },
  { messageID: 12, groupID: 2 },
  { messageID: 13, groupID: 2 },
  { messageID: 14, groupID: 2 },
  { messageID: 15, groupID: 2 },
  { messageID: 16, groupID: 2 },
  { messageID: 17, groupID: 3 },
  { messageID: 18, groupID: 3 },
  { messageID: 19, groupID: 3 },
  { messageID: 20, groupID: 3 },
  { messageID: 21, groupID: 3 },
  { messageID: 22, groupID: 3 },
  { messageID: 23, groupID: 3 },
  { messageID: 24, groupID: 3 },
  { messageID: 25, groupID: 4 },
  { messageID: 26, groupID: 4 },
  { messageID: 27, groupID: 4 },
  { messageID: 28, groupID: 4 },
  { messageID: 29, groupID: 4 },
  { messageID: 30, groupID: 4 },
  { messageID: 31, groupID: 4 },
  { messageID: 32, groupID: 4 },
  { messageID: 33, groupID: 5 },
  { messageID: 34, groupID: 5 },
  { messageID: 35, groupID: 5 },
  { messageID: 36, groupID: 5 },
  { messageID: 37, groupID: 5 },
  { messageID: 38, groupID: 5 },
  { messageID: 39, groupID: 5 },
  { messageID: 40, groupID: 5 },
  { messageID: 41, groupID: 6 },
  { messageID: 42, groupID: 6 },
  { messageID: 43, groupID: 6 },
  { messageID: 44, groupID: 6 },
  { messageID: 45, groupID: 6 },
  { messageID: 46, groupID: 6 },
  { messageID: 47, groupID: 6 },
  { messageID: 48, groupID: 6 },
  { messageID: 49, groupID: 7 },
  { messageID: 50, groupID: 7 },
  { messageID: 51, groupID: 7 },
  { messageID: 52, groupID: 7 },
  { messageID: 53, groupID: 7 },
  { messageID: 54, groupID: 7 },
  { messageID: 55, groupID: 7 },
  { messageID: 56, groupID: 7 },
  { messageID: 57, groupID: 8 },
  { messageID: 58, groupID: 8 },
  { messageID: 59, groupID: 8 },
  { messageID: 60, groupID: 8 },
  { messageID: 61, groupID: 8 },
  { messageID: 62, groupID: 8 },
  { messageID: 63, groupID: 8 },
  { messageID: 64, groupID: 8 },
  { messageID: 65, groupID: 9 },
  { messageID: 66, groupID: 9 },
  { messageID: 67, groupID: 9 },
  { messageID: 68, groupID: 9 },
  { messageID: 69, groupID: 9 },
  { messageID: 70, groupID: 9 },
  { messageID: 71, groupID: 9 },
  { messageID: 72, groupID: 9 },
  { messageID: 73, groupID: 10 },
  { messageID: 74, groupID: 10 },
  { messageID: 75, groupID: 10 },
  { messageID: 76, groupID: 10 },
  { messageID: 77, groupID: 10 },
  { messageID: 78, groupID: 10 },
  { messageID: 79, groupID: 10 },
  { messageID: 80, groupID: 10 },
  { messageID: 81, groupID: 8 },
  { messageID: 82, groupID: 8 },
  { messageID: 83, groupID: 8 },
  { messageID: 84, groupID: 8 },
  { messageID: 85, groupID: 8 },
  { messageID: 86, groupID: 8 },
  { messageID: 87, groupID: 8 },
  { messageID: 88, groupID: 8 },
  { messageID: 89, groupID: 7 },
  { messageID: 90, groupID: 7 },
  { messageID: 91, groupID: 7 },
  { messageID: 92, groupID: 7 },
  { messageID: 93, groupID: 7 },
  { messageID: 94, groupID: 7 },
  { messageID: 95, groupID: 7 },
  { messageID: 96, groupID: 7 },
  { messageID: 97, groupID: 9 },
  { messageID: 98, groupID: 9 },
  { messageID: 99, groupID: 9 },
  { messageID: 100, groupID: 9 },
  { messageID: 101, groupID: 9 },
  { messageID: 102, groupID: 9 },
  { messageID: 103, groupID: 9 },
  { messageID: 104, groupID: 9 },
  { messageID: 105, groupID: 10 },
  { messageID: 106, groupID: 10 },
  { messageID: 107, groupID: 10 },
  { messageID: 108, groupID: 10 },
  { messageID: 109, groupID: 10 },
  { messageID: 110, groupID: 10 },
  { messageID: 111, groupID: 10 },
  { messageID: 112, groupID: 10 },
];

export { users, messages, groups, userGroups, groupMessages };
