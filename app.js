const app = new Vue({
	el: '#main_wrapper',
	data: {
		title: 'Collections',
		summary: 'Collection of different categories',
		items: '',
		itemsBGs: '',
		uniqueItems: '',
		type: '',
		newTitle: '',
		newDescription: '',
		editID: '',
		editType: '',
		editTitle: '',
		editDescription: '',
		newType: '',
		error: false
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
						bgs.push({ colName : item.type, colorCode : colorCode });
					}
				});
				bgs.forEach((item) => {
					bgCss += '.'+item.colName+'{ background: '+item.colorCode+' }';
				});
				types.sort();
				app.uniqueItems = types;
				app.itemsBGs = bgCss;
			})
			.catch(function (error) {
			    console.log(error);
			});
		},
		addCollection: function(){
			if(!this.newTitle || !this.newDescription || !this.newType){
				this.error = true;
			}else{
				axios.post('ajax.php', {
					request: 'add',
					name: this.newTitle,
					description: this.newDescription,
					type: this.newType
				})
				.then(function (response) {
					app.newTitle = '';
					app.newDescription = '';
					app.newType = '';
					app.error = false;
					alert(response.data);
					app.allCollections();
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		editCollection: function(id){
			axios.post('ajax.php', {
			    request: 'edit',
			    id: this.editID,
				name: this.editTitle,
				description: this.editDescription,
				type: this.editType
			})
			.then(function (response) {
			    app.allCollections();
			    alert(response.data);
			})
			.catch(function (error) {
			    console.log(error);
			});
		},
		removeItem: function(id){
			axios.post('ajax.php', {
			    request: 'delete',
			    id: id
			})
			.then(function (response) {
			    app.allCollections();
			    alert(response.data);
			})
			.catch(function (error) {
			    console.log(error);
			});
		},
		refreshHead() {
		   document.getElementById('customStyle').innerHTML = this.css
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
    css() {
        return this.itemsBGs;
		}
	},
	mounted() {
		 setTimeout(() => this.refreshHead(), 1000);
	}
});