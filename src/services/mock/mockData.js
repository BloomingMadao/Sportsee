
export const MOCK_USERS = [
  {
    id: 'user123',
    username: 'sophiemartin',
    password: 'password123',
    weeklyGoal: 2, // à la racine chez Sophie
    userInfos: {
      firstName: 'Sophie',
      lastName: 'Martin',
      age: 32,
      gender: 'female',
      height: 165,
      weight: 60,
      createdAt: '2025-01-01',
      profilePicture: 'http://localhost:8000/images/sophie.jpg',
    },
    // daysAgo = nombre de jours avant aujourd'hui (converti en date par mockApi)
    sessions: [
      { daysAgo: 1, distance: 5.8, duration: 38, caloriesBurned: 422, heartRate: { min: 140, max: 178, average: 163 } },
      { daysAgo: 3, distance: 3.2, duration: 20, caloriesBurned: 248, heartRate: { min: 148, max: 184, average: 171 } },
      { daysAgo: 5, distance: 10.4, duration: 68, caloriesBurned: 756, heartRate: { min: 136, max: 172, average: 158 } },
      { daysAgo: 8, distance: 6.1, duration: 41, caloriesBurned: 445, heartRate: { min: 142, max: 176, average: 161 } },
      { daysAgo: 9, distance: 4.5, duration: 29, caloriesBurned: 327, heartRate: { min: 145, max: 180, average: 167 } },
      { daysAgo: 12, distance: 8.3, duration: 54, caloriesBurned: 602, heartRate: { min: 138, max: 174, average: 159 } },
      { daysAgo: 15, distance: 5.0, duration: 33, caloriesBurned: 361, heartRate: { min: 144, max: 179, average: 164 } },
      { daysAgo: 19, distance: 12.7, duration: 83, caloriesBurned: 921, heartRate: { min: 134, max: 170, average: 156 } },
    ],
  },
  {
    id: 'user789',
    username: 'emmaleroy',
    password: 'password789',
    // Emma n'a AUCUN objectif défini : cas à gérer en 6b
    userInfos: {
      firstName: 'Emma',
      lastName: 'Leroy',
      age: 28,
      gender: 'female',
      height: 170,
      weight: 62,
      createdAt: '2025-01-01',
      profilePicture: 'http://localhost:8000/images/emma.jpg',
    },
    sessions: [
      { daysAgo: 0, distance: 7.2, duration: 45, caloriesBurned: 512, heartRate: { min: 141, max: 177, average: 162 } },
      { daysAgo: 2, distance: 9.6, duration: 61, caloriesBurned: 698, heartRate: { min: 137, max: 173, average: 157 } },
      { daysAgo: 4, distance: 5.4, duration: 35, caloriesBurned: 389, heartRate: { min: 146, max: 181, average: 166 } },
      { daysAgo: 6, distance: 11.0, duration: 70, caloriesBurned: 801, heartRate: { min: 135, max: 171, average: 155 } },
      { daysAgo: 11, distance: 6.8, duration: 43, caloriesBurned: 478, heartRate: { min: 143, max: 178, average: 163 } },
    ],
  },
  {
    id: 'user456',
    username: 'marcdubois',
    password: 'password456',
    userInfos: {
      firstName: 'Marc',
      lastName: 'Dubois',
      goal: 2, // chez Marc, l'objectif est ICI et s'appelle autrement
      age: 45,
      gender: 'male',
      height: 180,
      weight: 85,
      createdAt: '2025-01-01',
      profilePicture: 'http://localhost:8000/images/marc.jpg',
    },
    sessions: [
      { daysAgo: 2, distance: 4.1, duration: 31, caloriesBurned: 356, heartRate: { min: 139, max: 172, average: 158 } },
      { daysAgo: 7, distance: 6.5, duration: 47, caloriesBurned: 540, heartRate: { min: 133, max: 168, average: 151 } },
      { daysAgo: 14, distance: 3.8, duration: 28, caloriesBurned: 322, heartRate: { min: 141, max: 175, average: 160 } },
      { daysAgo: 21, distance: 8.0, duration: 58, caloriesBurned: 667, heartRate: { min: 136, max: 170, average: 154 } },
    ],
  },
]