import { HideMenuDirective } from './hide-menu.directive';
import { CloseCloneGroupDirective } from './close-clone-group.directive';
import { CloneGroupDirective } from './clone-group.directive';
import { CepRequestDirective } from './ceprequest.directive';
import { MaskDirective } from './mask.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormActionsDirective } from './form-actions.directive';
import { CountAnimationDirective } from './count-animation.directive';
import { VerifyPasswordDirective } from './verify-password.directive';
import { DropifyDirective } from './dropify.directive';
import { FixedTopDirective } from './fixed-top.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormActionsDirective,
    MaskDirective,
    CepRequestDirective,
    CloneGroupDirective,
    CloseCloneGroupDirective,
    CountAnimationDirective,
    VerifyPasswordDirective,
    DropifyDirective,
    HideMenuDirective,
    FixedTopDirective
  ],
  exports: [
    FormActionsDirective,
    MaskDirective,
    CepRequestDirective,
    CloneGroupDirective,
    CloseCloneGroupDirective,
    CountAnimationDirective,
    VerifyPasswordDirective,
    DropifyDirective,
    HideMenuDirective,
    FixedTopDirective
  ]
})
export class DirectivesModule { }
