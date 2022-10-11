import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {addMinutes, format} from 'date-fns';

import {ChooseDateService} from '../../poll/services/choose-date.service';

@Component({
  selector: 'app-custom-definition-modal',
  templateUrl: './custom-definition-modal.component.html',
  styleUrls: ['./custom-definition-modal.component.scss'],
})
export class CustomDefinitionModalComponent implements OnInit {
  modalForm = new FormGroup({
    dates: new FormControl('', Validators.required),
    startTime: new FormControl('12:00', Validators.required),
    duration: new FormControl('00:15', Validators.required),
    pause: new FormControl('00:00', Validators.required),
    repeat: new FormControl(1, Validators.required),
  });

  constructor(
    private chooseDateService: ChooseDateService,
  ) {
  }

  ngOnInit(): void {
    const event = this.chooseDateService.customDefinitionEvent;
    if (!event || !event.end) {
      return;
    }

    const day = format(event.start, 'yyyy-MM-dd');
    this.modalForm.get('dates')?.setValue(day);
    this.chooseDateService.customDefinitionEvent = undefined;
  }

  apply() {
    if (!this.modalForm.valid) {
      return;
    }

    const dateValue = this.modalForm.get('dates')?.value;
    const startTimeValue = this.modalForm.get('startTime')?.value;
    const durationValue = this.modalForm.get('duration')?.value;
    const pauseValue = this.modalForm.get('pause')?.value;
    const repeat = this.modalForm.get('repeat')?.value;

    if (!dateValue || !repeat || !startTimeValue || !durationValue || !pauseValue) {
      return;
    }

    const dates = dateValue.split(',');
    const startTime = startTimeValue.split(':').map((value: string) => parseInt(value));
    const duration = durationValue.split(':').map((value: string) => parseInt(value));
    const pause = pauseValue.split(':').map((value: string) => parseInt(value));

    for (let i = 0; i < dates.length; i++) {
      let start = new Date(dates[i]);
      start.setHours(startTime[0], startTime[1], 0, 0);
      let end = new Date(start);
      end = addMinutes(end, duration[0] * 60 + duration[1]);
      this.chooseDateService.addEvent(start, end);
      for (let j = 0; j < repeat - 1; j++) {
        start = new Date(end);
        start = addMinutes(start, pause[0] * 60 + pause[1]);
        end = new Date(start);
        end = addMinutes(end, duration[0] * 60 + duration[1]);
        this.chooseDateService.addEvent(start, end);
      }
    }
  }
}
