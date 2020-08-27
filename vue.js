Vue.component('task-manager', {
	data() {
		return {
			taskList: [
				{
					title: 'Cписок дел № 1',
					tasks: [],
					id: 1
				},
				{
					title: 'Cписок дел № 2',
					tasks: [],
					id: 2
				},
				{
					title: 'Cписок дел № 3',
					tasks: [],
					id: 3
				}
			]
		}
	},
	methods: {
		add(item) {

			const { id, taskItem } = item;
			this.taskList.filter(tasklist => tasklist.id == id ? tasklist.tasks.push(taskItem) : null);

		},
		transfer(info) {
			const taskList = this.taskList;
			let { id, task } = info;

			taskList.filter(function (tasklist) {

				if (tasklist.id == id && taskList.length != id) {
					taskList[id].tasks.push(task)
				} else if (tasklist.id == id && taskList.length == id) {
					taskList[0].tasks.push(task)
				}
			});
		},
		addTasksList() {

			let number = this.taskList.length;
			this.taskList.push({
				title: 'Cписок дел' + ++number,
				tasks: [],
				id: number
			})
		}
	},
	template: `
	<div>
		<button @click="addTasksList">Добавить список</button>
		<div class="task">
			<current-tasks-list @transfer-task="transfer" @add-tasks="add"  :key="index" :info="item" v-for="(item, index) in taskList" />
		</div>
		</div>
		`
})

Vue.component('current-tasks-list', {
	props: ['info'],
	data() {
		return {
			taskItem: '',
			taskDelete: ''
		}
	},
	methods: {
		add() {
			this.$emit('add-tasks', {
				id: this.info.id,
				taskItem: this.taskItem
			});
			this.taskItem = '';
		},
		transfer() {

			this.taskDelete = this.info.tasks.pop();
			this.$emit('transfer-task', {
				id: this.info.id,
				task: this.taskDelete
			})

		}

	},
	template: `
		<div class="task-title">
			{{info.title}}
			<br/>
			<input v-model="taskItem">
			<button @click="add" :disabled="taskItem == 0" >Добавить</button>
			<ol >
						<task :nameTask="item" v-for="(item,index) in info.tasks"  :key="index"/>
		
			</ol>
			<button @click="transfer" :disabled="info.tasks.length == 0">Переместить</button>
		</div>
		`
})


Vue.component('task', {
	props: ['nameTask'],
	data() {
		return {

		}
	},
	methods: {

	},
	template: `
		<div>
			<li>{{nameTask}}</li>
		</div>
		`
})


const vue = new Vue({
	el: '#app'
})