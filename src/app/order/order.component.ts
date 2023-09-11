import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() data: any
  @Output() confirmDelivery = new EventEmitter();
  @Output() back = new EventEmitter();

  constructor() {

  }

  onConfirm() {
    this.confirmDelivery.emit();
  }

  onBack() {
    this.back.emit();
  }


}
