 const workoutPlan = `
Day 1 – Full Body Strength
- Squats: 3x10
- Push-ups (on knees if needed): 3x8–10
- Dumbbell Rows (light weight): 3x10
- Plank: 3x20s

Day 2 – Upper Body Focus
- Shoulder Press: 3x10
- Dumbbell Bicep Curls: 3x12
- Tricep Dips (bench/chair): 3x8–10
- Plank: 3x30s

Day 3 – Lower Body + Core
- Bodyweight Squats: 3x15
- Lunges: 3x10 per leg
- Calf Raises: 3x20
- Crunches: 3x15

Day 4 – Cardio + Core
- Jog or walk: 20–30 minutes
- Bicycle crunches: 3x15
- Russian twists: 3x20
- Full-body stretching

Day 5 – Full Body Power
- Jump squats: 3x12
- Incline push-ups: 3x10
- Dumbbell Deadlifts: 3x10
- Side Planks: 3x20s each side
`;


  const dietPlan = `
Breakfast:
- 3 Eggs omelette or boiled eggs
- 2 Parathas with butter or ghee
- Glass of full-fat milk or lassi
- Handful of nuts (almonds, walnuts)

Mid-Morning Snack:
- Banana or seasonal fruit
- Yogurt or a protein shake

Lunch:
- 1 cup cooked rice or 2 chapatis
- Chicken, beef, or lentils (dal)
- Mixed vegetable 
- Salad with olive oil dressing

Afternoon Snack:
- Peanut butter sandwich or trail mix
- Fresh fruit juice or milkshake

Dinner:
- Grilled fish or paneer (cottage cheese)
- 2 chapatis or a bowl of pulao
- Steamed vegetables
- A glass of warm milk before bed

Hydration:
- Drink at least 8-10 glasses of water daily
- Include herbal teas or fresh lime water
`;

  const tipsText = `
- Be consistent with your workouts and diet.
- Increase calories gradually and focus on nutrient-dense foods.
- Drink plenty of water.
- Get enough sleep for muscle recovery.
- Track your progress and adjust plans as needed.
`;

  const workoutTextEl = document.getElementById('workoutText');
  const dietTextEl = document.getElementById('dietText');
  const tipsTextEl = document.getElementById('tipsText');
  const workoutNotesEl = document.getElementById('workoutNotes');
  const dietNotesEl = document.getElementById('dietNotes');
  const tipsNotesEl = document.getElementById('tipsNotes');
  const exerciseForm = document.getElementById('exerciseForm');
  const exerciseSelect = document.getElementById('exerciseSelect');
  const setsInput = document.getElementById('setsInput');
  const repsInput = document.getElementById('repsInput');
  const exerciseList = document.getElementById('exerciseList');
  const workoutSection = document.getElementById('workoutSection');
  const dietSection = document.getElementById('dietSection');
  const workoutNav = document.getElementById('workoutNav');
  const dietNav = document.getElementById('dietNav');

  workoutTextEl.textContent = workoutPlan;
  dietTextEl.textContent = dietPlan;
  tipsTextEl.textContent = tipsText;

  workoutNav.addEventListener('click', () => {
    workoutSection.style.display = 'block';
    dietSection.style.display = 'none';
    workoutNav.classList.add('active');
    dietNav.classList.remove('active');
  });

  dietNav.addEventListener('click', () => {
    workoutSection.style.display = 'none';
    dietSection.style.display = 'block';
    dietNav.classList.add('active');
    workoutNav.classList.remove('active');
  });

  function loadFromStorage() {
    workoutNotesEl.value = localStorage.getItem('workoutNotes') || '';
    dietNotesEl.value = localStorage.getItem('dietNotes') || '';
    tipsNotesEl.value = localStorage.getItem('tipsNotes') || '';
    const savedExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    exerciseList.innerHTML = '';
    savedExercises.forEach(({exercise, sets, reps}) => {
      addExerciseToList(exercise, sets, reps);
    });
  }
  loadFromStorage();

  workoutNotesEl.addEventListener('input', () => {
    localStorage.setItem('workoutNotes', workoutNotesEl.value);
  });
  dietNotesEl.addEventListener('input', () => {
    localStorage.setItem('dietNotes', dietNotesEl.value);
  });
  tipsNotesEl.addEventListener('input', () => {
    localStorage.setItem('tipsNotes', tipsNotesEl.value);
  });

  function addExerciseToList(exercise, sets, reps) {
    const li = document.createElement('li');
    li.textContent = `${exercise} - Sets: ${sets}, Reps: ${reps}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveExercisesToStorage();
    });
    li.appendChild(deleteBtn);
    exerciseList.appendChild(li);
  }

  function saveExercisesToStorage() {
    const exercises = [];
    exerciseList.querySelectorAll('li').forEach(li => {
      const text = li.firstChild.textContent.trim();
      const [exercisePart, setsPart, repsPart] = text.split(/[-,]/).map(s => s.trim());
      const exercise = exercisePart;
      const sets = setsPart.replace('Sets: ', '');
      const reps = repsPart.replace('Reps: ', '');
      exercises.push({exercise, sets, reps});
    });
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }

  exerciseForm.addEventListener('submit', e => {
    e.preventDefault();
    const exercise = exerciseSelect.value;
    const sets = setsInput.value;
    const reps = repsInput.value;
    if (!exercise || !sets || !reps) {
      alert('Please fill all fields to add exercise.');
      return;
    }
    addExerciseToList(exercise, sets, reps);
    saveExercisesToStorage();
    exerciseForm.reset();
  });
