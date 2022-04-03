const app = new Vue({
	el: '#main_wrapper',
	data: {
		title: 'Collections',
		summary: 'Collection of different categories',
		items: '',
		itemsBGs: '',
		uniqueItems: '',
		type: '',
		activeModule: '',
		currentID: '',
		currentTitle: '',
		currentDescription: '',
		currentType: '',
		error: false,
		notificationMsg: ''
	},
	methods: {
		preventSubmit(e) {
			console.log("Form submitted");
			e.preventDefault();
		},
		toggleDetails: function(media){
			media.showDetail = !media.showDetail;
		},
		changeType: function(e){
			this.type = e.target.value;
		},
		allCollections: function(){
			//this.activeModule = '';
			axios.post('ajax.php', {
			    request: 'fetch'
			})
			.then(function (response) {
				app.items = response.data;
				const types = [];
				var bgs = [];
				var bgCss = '';
				app.items.forEach((item) => {
					if(!types.includes(item.type)){
						types.push(item.type);
						const colName = item.type;
						const colorCode = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
						bgs.push({ colName : 'list-item.'+item.type, colorCode : colorCode });
					}
				});
				bgs.forEach((item) => {
					bgCss += '.'+item.colName+'{ background-color: '+item.colorCode+' }';
				});
				types.sort();
				app.uniqueItems = types;
				app.itemsBGs = bgCss;
			})
			.catch(function (err) {
			    console.log(err);
			});
		},
		actionCollection: function(action){
			if(!this.currentTitle || !this.currentDescription || !this.currentType){
				app.error = true;
				app.notificationMsg = 'Oops... All fields are required';
			}else{				
				axios.post('ajax.php', {
					request: action,
					id: this.currentID,
					name: this.currentTitle,
					description: this.currentDescription,
					type: this.currentType
				})
				.then(function (response) {
					app.notificationMsg = response.data;
					app.allCollections();
					app.currentID = '',
					app.currentTitle = '',
					app.currentDescription = '',
					app.currentType = ''
				})
				.catch(function (err) {
					app.error = true;
					app.notificationMsg = err;
				});
			}
			app.hideNotification();
		},
		removeItem: function(id){
			axios.post('ajax.php', {
			    request: 'delete',
			    id: id
			})
			.then(function (response) {
			    app.notificationMsg = response.data;
			    app.allCollections();
				app.hideNotification();
			})
			.catch(function (err) {
			    app.error = true;
				app.notificationMsg = err;
			});
		},
		refreshHead() {
			document.getElementById('customStyle').innerHTML = this.css;
		},
		hideNotification() {
			setTimeout(function(){
				app.notificationMsg = '';
			}, 2000);
		}
	},
	created: function(){
		this.allCollections();
	},
	watch: {
		uniqueItems: function(val) {
			if (val) {
				this.type = '';
			}
		}
	},
	computed: {
		css(){
			return this.itemsBGs;
		}
	},
	mounted() {
		 setTimeout(() => this.refreshHead(), 300);
	}
});