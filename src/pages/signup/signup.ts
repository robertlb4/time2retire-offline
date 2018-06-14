import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { EmailValidation } from './email-validation';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  myForm: FormGroup;
  testPassword: string = '';
  length: boolean;
  capital: boolean;
  lower: boolean;
  special: boolean;
  number: boolean;
  sweetPassword: boolean;
  
  signupAttempt: boolean = false;
  passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  emailRegEx = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
  newUser: any = {
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
              public _user: User,
              public toastCtrl: ToastController,
              public loader: LoadingController,
              public fb: FormBuilder) {
    this.createForm();
  }

  passwordStrengh(event){
    console.log(event.key)
    if(event.key === 'Backspace'){
      this.testPassword = this.testPassword.substring(0, this.testPassword.length - 1);
    }
    else if(event.key === 'Shift'){
      this.testPassword;
    }
    else if(event.key){
      this.testPassword += event.key;
    }

    let lengthCheck = new RegExp('^.{8}');
    let capitalCheck = new RegExp('^(?=.*[A-Z])');
    let lowerCheck = new RegExp('^(?=.*[a-z])');
    let specialCheck = new RegExp('^(?=.*[!@#$&*])');
    let numberCheck = new RegExp('^(?=.*[0-9])');

    this.capital = capitalCheck.test(this.testPassword)? true : false 
    this.lower = lowerCheck.test(this.testPassword)? true : false 
    this.length = lengthCheck.test(this.testPassword)? true : false 
    this.special = specialCheck.test(this.testPassword)? true : false 
    this.number = numberCheck.test(this.testPassword)? true : false 
    this.sweetPassword = this.capital && this.lower && this.length && this.special && this.number ? true : false;       
  }
  createForm(){
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegEx)
      ])],
      confirmEmail: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.passwordRegEx)
      ])],
      confirmPassword: ['', Validators.required]
    }, {
      validator: [PasswordValidation.MatchPassword,EmailValidation.MatchEmail]
    })
  }

  newSignup() {
    let loader = this.loader.create({})
    loader.present();
    return this._user.signupCustom(this.newUser)
      .subscribe((newUser: any) => {
        console.log(newUser, 'Signup Successful');
        this._user.user = newUser;
        sessionStorage.setItem('token', newUser.token)
        sessionStorage.setItem('userId', newUser.userId)
        this._user.user = this.newUser;
        this.navCtrl.setRoot(MainPage);
        loader.dismiss()
      }, (err) => {
        let toast = this.toastCtrl.create({
          message: 'Something went wrong. Please try again later',
          duration: 2000,
          position: 'top'
        });
        toast.present()
        this.newUser.firstName = '';
        this.newUser.lastName = '';
        this.newUser.birthday = '';
        this.newUser.email = '';
        this.newUser.password = '';
        loader.dismiss();
      }
    )
  }

  submit(){
    
    this.signupAttempt = true;
    console.log(this.myForm.valid)
    console.log(this.myForm)
    if(!this.myForm.valid){
      let toast = this.toastCtrl.create({
        message: 'Registration Unsuccessful',
        duration: 2000,
        position: 'top'
      });
      toast.present()
    } 
    else {
      let toast = this.toastCtrl.create({
        message: 'Registration Successful',
        duration: 2000,
        position: 'top'
      });
      toast.present()
      this.newUser = {
        firstName: this.myForm.controls.firstName.value,
        lastName: this.myForm.controls.lastName.value,
        birthday: this.myForm.controls.birthday.value,
        email: this.myForm.controls.email.value,
        password: this.myForm.controls.password.value
      }
      this.newSignup();
    }     
  }
}
