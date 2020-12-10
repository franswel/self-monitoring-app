import { setMorning, setEvening, isSubmitted, getMessage, getDate, removeLastIfExists } from "../../services/viewService.js";
import { validate, required, isDate, isNumeric } from "../../deps.js";  

const validationRulesMorning = {
    date: [required, isDate],
    sleep_duration: [required, isNumeric],
    sleep_quality: [required],
    mood: [required],
};  

const validationRulesEvening = {
    date: [required, isDate],
    sport: [required, isNumeric],
    study: [required, isNumeric],
    eating_reg: [required],
    eating_qua: [required],
    mood: [required],
};  

const morningView = async({render, session}) => {
    const user = await session.get('user');
    render('morning.ejs', {date: await getDate(), sleep_duration: '', sleep_quality: 3, mood: 3, errors: [], user: user });
};

const eveningView = async({render, session}) => {
    const user = await session.get('user');
    render('evening.ejs', {date: await getDate(), sport: '', study: '', eating_reg: 3, eating_qua: 3, mood: 3, errors: [], user: user });
};

const reportView = async({render, session}) => {
    const user = await session.get('user');
    render('reportingView.ejs', { data: await isSubmitted(user.id), user: user });
};

const frontPage = async({render, session}) => {
    const user = await session.get('user');
    if (user) {
        render('frontPage.ejs', { data: await getMessage(user.id), user: user });
    } else {
        render('frontPageNoMessage.ejs', { user: user });
    }
    
};

const addMorningData = async({request, render, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const user = await session.get('user');
    let data = {
        date: params.get('date'),
        sleep_duration: params.get('sleep_duration'),
        sleep_quality: Number(params.get('sleep_quality')),
        mood: Number(params.get('mood')),
    };

    let allErrors = [];

    const [passes, errors] = await validate(data, validationRulesMorning);
    if (!passes) {
        Object.keys(errors).forEach((attribute) => {
            Object.values(errors[attribute]).forEach((err) => {
                allErrors.push(err);
            })
        });
    }

    let curDate = await getDate();
    if (Number(data.date.split('-').join('')) > Number(curDate.split('-').join(''))) {
        allErrors.push("You can't report data in the future");
    }

    if (Number(data.sleep_duration) < 0) {
        allErrors.push("Sleep duration can't be negative.")
    }

    if (allErrors.length === 0) {
        await removeLastIfExists(data.date, 'morning', user.id);
        await setMorning(data.date, data.sleep_duration, data.sleep_quality, data.mood, user.id);
        response.redirect('/behaviour/reporting');
    } else {
        render('morning.ejs', {date: data.date, sleep_duration: Number(data.sleep_duration), sleep_quality: data.sleep_quality, mood: data.mood, errors: allErrors, user: user});
    }
};

const addEveningData = async({request, render, response, session}) => {
    const body = request.body();
    const params = await body.value;
    
    const user = await session.get('user');
    let data = {
        date: params.get('date'),
        sport: params.get('excercise'),
        study: params.get('studying'),
        eating_reg: Number(params.get('eating_regularity')),
        eating_qua: Number(params.get('eating_quality')),
        mood: Number(params.get('mood')),
    };

    let allErrors = [];

    const [passes, errors] = await validate(data, validationRulesEvening);
    if (!passes) {
        Object.keys(errors).forEach((attribute) => {
            Object.values(errors[attribute]).forEach((err) => {
                allErrors.push(err);
            })
        });
    }

    let curDate = await getDate();
    if (Number(data.date.split('-').join('')) > Number(curDate.split('-').join(''))) {
        allErrors.push("You can't report data in the future.");
    }

    if (Number(data.sport) < 0 || Number(data.study) < 0) {
        allErrors.push("Excercise or studying can't be negative.")
    }

    if (allErrors.length === 0) {
        await removeLastIfExists(data.date, 'evening', user.id);
        await setEvening(data.date, Number(data.sport), Number(data.study), data.eating_reg, data.eating_qua, data.mood, user.id);
        response.redirect('/behaviour/reporting');
    } else {
        render('evening.ejs', {date: data.date, sport: Number(data.sport), study: Number(data.study), eating_reg: data.eating_reg, eating_qua: data.eating_qua, mood: data.mood, errors: allErrors, user: user});
    }
};
 
export { frontPage, morningView, eveningView, reportView, addMorningData, addEveningData };