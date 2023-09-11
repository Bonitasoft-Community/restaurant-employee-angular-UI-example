import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../login/token-storage.service';


interface Task {
  id: Number,
  caseId: Number,
  displayName: String,
  params: CaseVariables[]
}

interface CaseVariables {
  name: String,
  value: String
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  public currentSelection: any

  constructor(private taskService: TaskService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { this.data = Array<Task>() }

  public data: Task[]
  ngOnInit(): void {
    this.getUserTasks();

  }

  getUserTasks(): void {
    let user: any;

    this.taskService.getTasks().subscribe((response) => {
      this.data = response.body
      console.log(response);
    })
  }



  onclicData(entry: any) {

    this.taskService.getCaseVariables(entry.caseId).subscribe((response) => {
      console.log(response);
      this.currentSelection = entry
      this.currentSelection.params = response.body
    })
  }

  onConfirm() {

    this.taskService.executeTask(this.currentSelection.id, this.tokenStorageService.getToken()).subscribe((response) => {
      console.log(response);
      this.getUserTasks()
    })
    this.currentSelection = null

  }

  onBack() {
    this.currentSelection = null
    this.getUserTasks()
  }

}



