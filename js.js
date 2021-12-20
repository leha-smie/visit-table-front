// window.addEventListener('DOMContentLoaded', () => {
// 	let table = document.querySelector('tbody'),
// 		form = document.querySelector('form'),
// 		countPiople = document.querySelectorAll('.td-name').length,
// 		inputAdd = document.querySelector('.form-input'),
// 		btnSend = document.querySelector('.button-send'),
// 		lableChecks = document.querySelectorAll('.check-trening'),
// 		inputChecks = document.querySelectorAll('.input-check');
// 	clients = [


// 	];




// 	lableChecks.forEach(element => {
// 		element.addEventListener('click', (el) => {
// 			inputChecks.forEach(block => {
// 				if (block.dataset.id === el.target.dataset.id) {
// 					el.target.classList.toggle('checked');
// 				}
// 			});
// 		});
// 	});

// 	btnSend.addEventListener('click', () => {
// 		inputChecks = document.querySelectorAll('.input-check');
// 		inputChecks.forEach((element, index) => {
// 			if (element.classList.contains('checked')) {
// 				countTren = document.querySelectorAll('.count');
// 				if (+countTren[index].textContent) {
// 					countTren[index].textContent = +countTren[index].textContent - 1;
// 				}
// 			}

// 		});
// 	});

// 	class Sporstmen {
// 		constructor(name) {
// 			this.name = name;
// 			this.count = 8;
// 			this.days = 30;
// 		}
// 	};



// 	form.addEventListener('submit', (e) => {
// 		e.preventDefault();
// 		const sportsmen = new Sporstmen(inputAdd.value);
// 		clients.push(sportsmen);
// 		console.log(clients);
// 
// countPiople++
// let field = document.createElement('tr');
// field.innerHTML = `<th scope="row">${countPiople}</th>
// 					<td class="td-name">${inputAdd.value}</td>
// 					<td><input type="checkbox"></td>
// 					<td>8</td>
// 					<td>30</td>`
// table.appendChild(field);
// inputAdd.value = '';
// });

// let fullName;

// fetch('https://fierce-brushlands-07170.herokuapp.com/name')
// 	.then(res => res.json())
// 	.then(data => {
// 		console.log(data);
// 		fullName = data;
// 		field.textContent = `имя ${fullName.name}; фамилия ${fullName.secondName}`
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})



// });




const clientsBase = {
	clients: [
		// {
		// 	name: 'Наумкина К.',
		// 	count: 8,
		// 	days: 30,
		// 	id: 1,
		// },
		// {
		// 	name: 'Орлова И.',
		// 	count: 8,
		// 	days: 30,
		// 	id: 2,
		// },
		// {
		// 	name: 'Сычева Т.',
		// 	count: 8,
		// 	days: 30,
		// 	id: 3,
		// }
	],
	getClients() {
		return this.clients;
	},

	change(id) {
		const find = this.clients.find(el => el.id === id);
		if (find.count === 1) {
			this.deleteClient(find.id);
		} else {
			--find.count;
		}
	},

	deleteClient(id) {
		const find = this.clients.find(element => element.id === id);
		this.clients.splice(this.clients.indexOf(find), 1);
		this.indexReset();
	},

	indexReset() {
		for (let i = 0; i < this.clients.length; i++) {
			this.clients[i].id = i + 1;
		};
	},

	addClient(name) {
		this.clients.push(this.createObj(name));
		this.indexReset();
		alert("Точно добавить подопытного???");
		console.log(JSON.stringify(this.clients));
	},
	createObj(name) {
		let date = new Date();
		let dateChenge = new Date();

		let startDate = `${this.formatDate(date.getDate())}: ${this.formatDate(date.getMonth() + 1)}: ${date.getFullYear()}`;


		date.setMonth(date.getMonth() + 1);


		let finishDate = `${this.formatDate(date.getDate())}:${this.formatDate(date.getMonth() + 1)}:${date.getFullYear()}`;

		const days = (date - dateChenge) / 1000 / 60 / 60 / 24;


		return {
			name: name,
			count: 8,
			days: days,
			startDate: startDate,
			finishDate: finishDate
		}
	},

	formatDate(num) {
		if (num < 10) {
			return `0${num}`
		} else {
			return `${num}`
		}
	}

};

const table = {
	clientsBase,
	tbody: document.querySelector('tbody'),
	btnSend: document.querySelector('.button-send'),

	// numFields: document.querySelectorAll('.number'),
	// nameFields: document.querySelectorAll('.td-name'),
	// labels: document.querySelectorAll('.check-trening'),

	// dayFields: document.querySelectorAll('.day'),
	createFieldTable(arrClients) {
		let num = arrClients.length;
		arrClients.forEach(element => {
			num++;
			const newtr = document.createElement('tr');
			newtr.setAttribute('id', `${element.id}`);
			newtr.innerHTML = `<th class="number">${element.id}</th>
			<td class="td-name">${element.name}</td>
			<td>
				<label for="${element.name, num}" class="check-trening">
					<input id="${element.name, num}" type="checkbox" class="input-check">
				</label>
			</td>
			<td class="count">${element.count}</td>
			<td class="day">${element.days}</td>
			<td >
				<div class="start-day">${element.startDate}</div>
			</td>
			<td class="finish-day">${element.finishDate}</td>`
			this.tbody.appendChild(newtr);
		});
	},

	addEventsBtnSend() {
		this.btnSend.addEventListener('click', () => {
			const checkFields = document.querySelectorAll('.input-check');
			checkFields.forEach((element, index) => {
				if (element.checked) {
					this.clientsBase.change(index + 1);
					this.clearTable();
					this.createFieldTable(this.clientsBase.getClients());
				}
			});

		})
	},
	clearTable() {
		const tr = this.tbody.querySelectorAll('tr');
		tr.forEach(element => {
			element.remove();
		});
	},
};
const createForm = {
	table,
	clientsBase,
	input: document.querySelector('.form-input'),
	form: document.querySelector('.form-add'),


	createEvent() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (this.input.value) {
				this.createClient(this.input.value);
				this.input.value = '';
			} else {
				return
			}
		});
	},
	createClient(name) {
		this.clientsBase.addClient(name);
		this.table.clearTable();
		this.table.createFieldTable(this.clientsBase.getClients());
	},
};

const app = {
	table,
	clientsBase,
	createForm,
	start() {
		fetch('https://fierce-brushlands-07170.herokuapp.com/clients')
			.then(res => res.json())
			.then(data => {
				this.clientsBase.clients = data;
				const clients = this.clientsBase.getClients();
				this.table.createFieldTable(clients);
				this.table.addEventsBtnSend();
				this.createForm.createEvent();
			}).catch(err => console.log(err))
	},
};

app.start();



