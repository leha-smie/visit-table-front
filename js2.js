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
	clients: new Promise((resolve, reject) => {
		const clients = fetch('http://ksusha.na4u.ru/clients')
			// const clients = fetch('http://localhost:3000/clients')
			.then(res => res.json())
			.catch(err => console.log(err));
		resolve(clients);
	}),
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
		alert("Точно добавить подопытного???");
		return this.createObj(name)
	},
	createObj(name) {
		let date = new Date();
		let dateChenge = new Date();

		let startDate = `${this.formatDate(date.getDate())}.${this.formatDate(date.getMonth() + 1)}.${date.getFullYear()}`;


		date.setMonth(date.getMonth() + 1);


		let finishDate = `${this.formatDate(date.getDate())}.${this.formatDate(date.getMonth() + 1)}.${date.getFullYear()}`;

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
			let arrId = [];
			checkFields.forEach((element, index) => {
				if (element.checked) {
					arrId.push(index + 1);
				}
			});

			fetch('http://ksusha.na4u.ru/increaseTrening', {
				// fetch('http://localhost:3000/increaseTrening', {
				method: 'PUT', // или 'PUT'
				body: JSON.stringify(arrId),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(data => data.json())
				.then(data => {
					this.clearTable();
					this.createFieldTable(data);
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
	pErr: document.querySelector('.box-err'),


	createEvent() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			const regExp = /^[А-Я]{1}[а-я]+\s[А-Я]{1}.{1}/g;
			if (this.input.value && this.input.value.match(regExp)) {
				this.createClient(this.input.value);
				this.input.value = '';
				this.input.style.border = '';
				this.pErr.style.display = 'none';
			} else {
				this.input.style.border = '3px solid red';
				this.pErr.style.display = 'block';
				return
			}
		});
	},
	createClient(name) {
		this.table.clearTable();
		const client = this.clientsBase.addClient(name);
		fetch('http://ksusha.na4u.ru/addClient', {
			// fetch('http://localhost:3000/addClient', {
			method: 'POST', // или 'PUT'
			body: JSON.stringify(client), // данные могут быть 'строкой' или {объектом}!
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.table.createFieldTable(data);
			}).catch((err) => console.log(err))
		// this.clientsBase.addClient(name);
		// this.table.clearTable();
		// this.table.createFieldTable(this.clientsBase.getClients());

	},
};

const app = {
	table,
	clientsBase,
	createForm,
	start() {
		this.clientsBase.getClients()
			.then(data => {
				this.table.createFieldTable(data);
				this.table.addEventsBtnSend();
				this.createForm.createEvent();
			})
			.catch((err) => console.log(err));
		// this.clientsBase.getClients()
		// 	.then(data => {
		// 		console.log("ok");
		// 		this.table.createFieldTable(data);
		// 		this.table.addEventsBtnSend();
		// 		this.createForm.createEvent();
		// 	})
		// 	.catch((err) => console.log(err));
	},


};

app.start();



