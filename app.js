const items = [
	{
		title: 'Economics',
		summary: 'Basics of Demand and Supply',
		type: 'books',
		showDetail: false
	},
	{
		title: 'Cycle',
		summary: 'Cycle lorem ipsum',
		type: 'vehicle',
		showDetail: false
	},
	{
		title: 'Tomotto',
		summary: 'tomotto lorem ipsum',
		type: 'vegitable',
		showDetail: false
	},
	{
		title: 'History',
		summary: '1920-1950',
		type: 'books',
		showDetail: false
	},
	{
		title: 'Headphone',
		summary: 'headphone lorem ipsum',
		type: 'gudgets',
		showDetail: false
	},
	{
		title: 'Mobile',
		summary: 'mobile lorem ipsum',
		type: 'gudgets',
		showDetail: false
	},
	{
		title: 'Car',
		summary: 'Car lorem ipsum',
		type: 'vehicle',
		showDetail: false
	},
	{
		title: 'Onion',
		summary: 'onion lorem ipsum',
		type: 'vegitable',
		showDetail: false
	},
	{
		title: 'Carrot',
		summary: 'carrot lorem ipsum',
		type: 'vegitable',
		showDetail: false
	},
	{
		title: 'Truck',
		summary: 'truck lorem ipsum',
		type: 'vehicle',
		showDetail: false
	},
	{
		title: 'Mango',
		summary: 'mango lorem ipsum',
		type: 'fruits',
		showDetail: false
	},
	{
		title: 'Bus',
		summary: 'bus lorem ipsum',
		type: 'vehicle',
		showDetail: false
	}
]

const app = new Vue({
	el: '#items-list',
	data: {
		title: 'Library',
		summary: 'Collection of different categories',
		itemList: items,
		type: '',
		newTitle: '',
		newSummary: '',
		newType: '',
		error: false
	},
	methods: {
		toggleDetails: function(media){
			media.showDetail = !media.showDetail;
		},
		changeType: function(e){
			this.type = e.target.value;
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		addNew: function(){
			if(!this.newTitle || !this.newSummary || !this.newType){
				this.error = true;
			}else{
				this.itemList.push({
					title: this.newTitle,
					summary: this.newSummary,
					type: this.newType,
					showDetail: false
				});
				this.newTitle = '';
				this.newSummary = '';
				this.newType = '';
				this.error = false;
			}
		},
		removeItem: function(item){
			this.itemList.splice(this.itemList.indexOf(item), 1);
		}	
	},
	computed: {
		uniqueItems: function(){
			const types = [];
			this.itemList.forEach((item) => {
				if(!types.includes(item.type)){
					types.push(item.type);
				}
			});
			types.sort();
			return types;
		}
	}
});