import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../../../Core/Models/post-data.interface';
import { getUserData } from '../../../../../../Core/utilities/getUserData';
import { PostService } from '../../../../../../Core/Services/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postService = inject(PostService);
  contentControl = new FormControl('');
  privacyControl = new FormControl('public');
  selectedFile!: File;
  imgUrl: string | ArrayBuffer | null | undefined;
  userData: User = getUserData();
  changeFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
    this.previewImage();
  }
  previewImage() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedFile);
    fileReader.addEventListener('load', (e) => {
      this.imgUrl = e.target?.result;
    });
  }
  submitPost(e: SubmitEvent, formElement: HTMLFormElement) {
    e.preventDefault();
    const formData = new FormData();

    if (this.contentControl.value) {
      formData.append('body', this.contentControl.value!);
    }
    if (this.privacyControl.value) {
      formData.append('privacy', this.privacyControl.value!);
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
          formElement.reset();
          this.imgUrl = '';
        }
      },
    });
  }
  removeFile(): void {
    this.imgUrl = '';
  }
}
