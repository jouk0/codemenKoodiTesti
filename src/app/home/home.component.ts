import { Component } from '@angular/core';
import { BackendService } from '../backend.service'
import { Users } from '../users'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    public myForm: FormGroup;
    public users: Array<Users> = []
    public showNewUserInputForm: boolean = false
    private modify: number = 0
    constructor(private backend: BackendService) {
      this.users = this.backend.users
      this.myForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.minLength(3)]),
        website: new FormControl('', [Validators.required, Validators.minLength(3)]),
        street: new FormControl('', [Validators.required]),
        suite: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        lat: new FormControl('', [Validators.required]),
        lng: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        companyName: new FormControl('', [Validators.required]),
        catchPhrase: new FormControl('', [Validators.required]),
        bs: new FormControl('', [Validators.required])
      });
    }
    modifyClient(e:MouseEvent, user:Users, index: number) {
      this.modify = user.id
      this.showNewUserInputForm = true
      this.myForm = new FormGroup({
        name: new FormControl(user.name, [Validators.required, Validators.minLength(3)]),
        username: new FormControl(user.username, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(user.email, [Validators.required, Validators.minLength(3)]),
        website: new FormControl(user.website, [Validators.required, Validators.minLength(3)]),
        street: new FormControl(user.address.street, [Validators.required]),
        suite: new FormControl(user.address.suite, [Validators.required]),
        zipcode: new FormControl(user.address.zipcode, [Validators.required]),
        city: new FormControl(user.address.city, [Validators.required]),
        lat: new FormControl(user.address.geo.lat, [Validators.required]),
        lng: new FormControl(user.address.geo.lng, [Validators.required]),
        phone: new FormControl(user.phone, [Validators.required]),
        companyName: new FormControl(user.company.name, [Validators.required]),
        catchPhrase: new FormControl(user.company.catchPhrase, [Validators.required]),
        bs: new FormControl(user.company.bs, [Validators.required])
      });
    }
    submit() {
      let newUserData: Users = {
        id: (this.users.length+1),
        name: this.myForm.get('name')?.value,
        username: this.myForm.get('username')?.value,
        email: this.myForm.get('email')?.value,
        address: {
          street: this.myForm.get('street')?.value,
          suite: this.myForm.get('suite')?.value,
          city: this.myForm.get('city')?.value,
          zipcode: this.myForm.get('zipcode')?.value,
          geo: {
            lat: this.myForm.get('lat')?.value,
            lng: this.myForm.get('lng')?.value
          }
        },
        phone: this.myForm.get('phone')?.value,
        website: this.myForm.get('website')?.value,
        company: {
          name: this.myForm.get('companyName')?.value,
          catchPhrase: this.myForm.get('catchPhrase')?.value,
          bs: this.myForm.get('email')?.value
        }
      }
      if(this.modify) {
        this.users[(this.modify-1)] = newUserData
        this.backend.updateUser(newUserData, (this.modify-1))
      } else {
        this.users.push(newUserData)
        this.backend.addToUsers(newUserData)
      }
      this.showNewUserInputForm = false
      this.modify = 0
    }
    closeForm(e:MouseEvent) {
      e.stopPropagation()
      e.preventDefault()
      this.showNewUserInputForm = !this.showNewUserInputForm
    }
    addNewUser(e:MouseEvent) {
      e.stopPropagation()
      e.preventDefault()
      this.showNewUserInputForm = !this.showNewUserInputForm
    }
    removeClient(e: MouseEvent, index: number) {
      e.stopPropagation()
      e.preventDefault()
      this.users.splice(index, 1)
      this.backend.deleteFromUsers(index)
    }
}
