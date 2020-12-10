import { checkEmail, registerAccount, getUser } from "../../services/userService.js";
import { validate, required, minLength, isEmail } from "../../deps.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const validationRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
};  

const showRegistrationForm = async({render, session}) => {
    const user = await session.get('user');
    render('register.ejs', {errors: [], email: '', user: user});
};

const postRegistrationForm = async({request, render, response}) => {
    const body = request.body();
    const params = await body.value;

    let data = {
        email: params.get('email'),
        password: params.get('password'),
        verification: params.get('verification'),
    };

    let allErrors = [];

    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        Object.keys(errors).forEach((attribute) => {
            Object.values(errors[attribute]).forEach((err) => {
                allErrors.push(err);
            })
        });
    }
  
    if (data.password !== data.verification) {
      allErrors.push('The entered passwords did not match');
    }

    const existingUsers = await checkEmail(data.email);
    if (existingUsers.rowCount > 0) {
      allErrors.push('The email is already reserved.');
    }

    if (allErrors.length === 0) {
        const hash = await bcrypt.hash(data.password);
        await registerAccount(data.email, hash);
        response.redirect('/auth/login');
    } else {
        render('register.ejs', {errors: allErrors, email: data.email, user: null });
    }
};

const showLoginForm = async({render}) => {
    render('login.ejs', { errors: "", user: null });
};
  
const postLoginForm = async({render, request, response, session}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    let errors = "";
  
    const res = await getUser(email);
    if (res.rowCount === 0) {
        errors = "Invalid email or password";
        render('login.ejs', {errors: errors, user: null});
    } else {
        const userObj = res.rowsOfObjects()[0];
    
        const hash = userObj.password;
        
        const passwordCorrect = await bcrypt.compare(password, hash);
        if (!passwordCorrect) {
            errors = "Invalid email or password";
        }
      
        if (errors.length === 0) {
            await session.set('authenticated', true);
            await session.set('user', {
                id: userObj.id,
                email: userObj.email
            });
            response.redirect('/');
        } else {
            render('login.ejs', {errors: errors, user: null });
        }
    }
}
  
const postLogout = async({response, session}) => {
    await session.set('authenticated', false);
    await session.set('user', null );
    response.redirect('/');
};

export { showRegistrationForm, postRegistrationForm, showLoginForm, postLoginForm, postLogout };