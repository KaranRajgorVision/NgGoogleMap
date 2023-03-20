import { Component, OnInit,ViewChild } from '@angular/core';
import { StudentService } from '../service/student.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { IForm, StandardResponse, Student } from '../Models/Models';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  studentList:Student[]=[];
  modalTitle : string="Add Student";
  hobbies:string[]=['Dance','Circket','Song','Football','Gaming'];
  hobbiesArray :string[] = [];
  isShowModal:boolean=false;
  studentId:number = 0;
  studentListTyped:Student[]=[];

  @ViewChild('closebutton') closebutton:any;
  studentTypedForm:IForm<Student>={};
  studentForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    gender: new FormControl('Male'),
    address: new FormControl(''),
    description: new FormControl(''),
    zipcode: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    hobbies:new FormControl(''),
    phone:new FormControl('')
  });


  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.GetAllStudentList();
    this.GetAllStudentListTyped();
  }

  GetAllStudentList(){
    this.studentService.GetAllStudentList().subscribe((res:StandardResponse<Student>)=>{
        if(res != null && res?.isSuccess && res?.payload != null){
          this.studentList = res?.payload;
        }
    });
  }

  onSubmit(){
    if(this.studentId > 0){
      this.UpdateStudent(this.studentForm.value);
    }
    else{
      this.studentService.AddStudent(this.studentForm.value).subscribe((res)=>{
        if(res != null && res?.isSuccess){
          this.GetAllStudentList();
          this.shoHideModal(false);
          this.studentForm.reset();
        }
      });
    }

  }
  hobbieChangeEvent(event:any){
    if(event != null){
      if(event?.target?.checked){
        this.hobbiesArray.push(event?.target?.value);
      }
      else
      {
        let index = this.hobbiesArray.indexOf(event?.target?.value);
        if(index !== -1){
          this.hobbiesArray.splice(index, 1);
        }
      }
      let stringHobbies =   this.hobbiesArray.join(',');
      stringHobbies = stringHobbies == undefined ? "" : stringHobbies;
      stringHobbies = stringHobbies.replace(/^,/, '');
      this.studentForm.controls['hobbies'].setValue(stringHobbies);
    }

  }

  shoHideModal(flag:boolean=false){
    if(!flag){
      this.closebutton?.nativeElement?.click()
    }
  }

  Delete(studentId:number = 0){
    if (confirm("Are you sure you want to Delete?")) {
      if(studentId > 0){
        this.studentService.DeleteStudent(studentId).subscribe((res)=>{
          if(res != null && res?.isSuccess){
            this.GetAllStudentList();
          }
        });
      }
  } else {
      // user clicked Cancel
  }
  }

  GetStudentDetilsById(studentId:number = 0){
    if(studentId > 0){
      this.studentService.GetStudentByStudentId(studentId).subscribe((res:StandardResponse<Student>)=>{
        if(res != null && res?.isSuccess && res?.payload != null && res?.payload?.length > 0){
            let studentData = res?.payload[0];
            this.studentId = studentId;
            this.studentForm.setValue({
              firstName: studentData?.firstName,
              lastName: studentData?.lastName,
              email: studentData?.email,
              gender: studentData?.gender,
              address: studentData?.address,
              description: studentData?.description,
              zipcode: studentData?.zipcode,
              city: studentData?.city,
              state: studentData?.state,
              country: studentData?.country,
              hobbies:studentData?.hobbies,
              phone:studentData?.phone
            });

            this.hobbiesArray = studentData?.hobbies?.split(',');
        }
      });
    }
  }

  UpdateStudent(obj:any){
    if(this.studentId > 0 && obj != null){
      this.studentService.UpdateStudent(this.studentId,obj).subscribe((res)=>{
        if(res != null && res?.isSuccess){
          alert('Record Updated Successfully !!');
          this.shoHideModal(false);
          this.clearForm();
          this.GetAllStudentList()
        }
      });
    }

  }
  clearForm(){
    this.studentId = 0;
    this.studentForm.reset();
    this.hobbiesArray = [];
  }

  GetAllStudentListTyped(){
    this.studentService.GetAllStudentList().subscribe((res:StandardResponse<Student>)=>{
        if(res != null && res?.isSuccess && res?.payload != null){
           this.studentListTyped = res.payload;
        }
    });
  }

}
