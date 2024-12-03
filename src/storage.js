function saveInStorage(data) {
    sessionStorage.setItem('height', data.height);
    sessionStorage.setItem('weight', data.weight);
    sessionStorage.setItem('gender', data.gender);
    sessionStorage.setItem('exercise', data.exercise);
    sessionStorage.setItem('heart_rate', data.heart_rate);
    sessionStorage.setItem('sleep_hours', data.sleep_hours);
    sessionStorage.setItem('steps', data.steps);
    sessionStorage.setItem('calories', data.calories);
}

function loginFormSubmit() {
    return {
        height: sessionStorage.getItem('height'),
        weight: sessionStorage.getItem('weight'),
        gender: sessionStorage.getItem('gender'),
        exercise: sessionStorage.getItem('exercise'),
        heart_rate: sessionStorage.getItem('heart_rate'),
        sleep_hours: sessionStorage.getItem('sleep_hours'),
        steps: sessionStorage.getItem('steps'),
        calories: sessionStorage.getItem('calories'),
    }
}

export { saveInStorage, loginFormSubmit };