import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {
  newTask: string = '';
  newTaskDescription: string = '';
  selectedCategory: string = '';
  newTaskDate: string = '';
  tasks: Array<{ name: string, description: string, category: string, date: string }> = [];
  
  editingTask: { name: string, description: string, category: string, date: string } | null = null;

  constructor(public navCtrl: NavController) {}

  addTask() {
    if (this.newTask.trim() !== '' && this.selectedCategory !== '' && this.newTaskDate) {
      this.tasks.push({
        name: this.newTask,
        description: this.newTaskDescription,
        category: this.selectedCategory,
        date: this.newTaskDate
      });
      this.clearForm();
    }
  }

  editTask(task) {
    this.editingTask = { ...task }; 
  }

  saveTask() {
    if (this.editingTask) {
      const index = this.tasks.findIndex(task => task.date === this.editingTask.date && task.name === this.editingTask.name);
      if (index > -1) {
        this.tasks[index] = this.editingTask; 
        this.clearForm();
      }
    }
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  clearForm() {
    this.newTask = '';
    this.newTaskDescription = '';
    this.selectedCategory = '';
    this.newTaskDate = '';
    this.editingTask = null;
  }
}
