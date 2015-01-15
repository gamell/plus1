var plusOneGauges = {}, minusOneGauges = {};

Template.sentiment.helpers({
	plusOneButtonClass: function(){
        var isVotingAllowed = Session.get('sentiment-'+this._id+'.iteration') < Template.currentData().iteration;
        return isVotingAllowed ? "" : "disabled";
	}
});

Template.sentiment.events({

	"click button.plus-one": function (event) {
        var iterationKey = 'sentiment-'+this._id+'.iteration';
		var updates = Sentiments.update({_id: this._id}, {$inc: { plusOnes: 1 }});
        if(updates > 0){
            Session.set(iterationKey, this.iteration);
        }
        return false;
    },
    "click button.minus-one": function (event) {
        var iterationKey = 'sentiment-'+this._id+'.iteration';
        var updates = Sentiments.update({_id: this._id}, {$inc: { minusOnes: 1 }});
        if(updates > 0){
            Session.set(iterationKey, this.iteration);
        }
        return false;
    },
    "click button.reset": function (event) {
		Sentiments.update({_id: this._id}, {$inc: { iteration: 1 }, $set :{ plusOnes: 0, minusOnes: 0}});
        return false;
    }
});

Template.sentiment.created = function(){
    var iterationKey = 'sentiment-'+this.data._id+'.iteration';
	if(!Session.get(iterationKey) || (Session.get(iterationKey) > this.data.iteration)){
		Session.set(iterationKey, this.data.iteration-1);
	}
};

Template.sentiment.rendered = function () {
    
    var data = Template.currentData();
    var id = data._id;

    // setting the height to be the same as width

    $(".gauge").height(function(){
        return ($(this).width() * 0.8);
    });


    plusOneGauges[id] = new JustGage({
        id: "plus-one-gauge-"+id, 
        value: data.plusOnes, 
        min: 0,
        max: 30,
        title: "Plus Ones",
        label: "",
        showMinMax: false,
        valueFontColor: "#00aa00",
        titleFontColor: "#222222",  
        levelColors: [
          "#00aa00",
          "#00cc00",
          "#00ff00"
        ]          
    });

    minusOneGauges[id] = new JustGage({
        id: "minus-one-gauge-"+id, 
        value: data.minusOnes, 
        min: 0,
        max: 30,
        title: "Minus Ones",
        label: "",
        showMinMax: false,
        valueFontColor: "#aa0000",
        titleFontColor: "#222222",  
        levelColors: [
          "#aa0000",
          "#cc0000",
          "#ff0000"
        ]          
    });

    this.autorun(function(){
        var data = Template.currentData();
        plusOneGauges[data._id].refresh(data.plusOnes);
        minusOneGauges[data._id].refresh(data.minusOnes);
    });

};

// $("document").onReady(function)

// Tracker.autorun(function () {
//   var iteration = this.iteration;
//   if (iteration)
//     Session.set("oldest", oldest.name);
// });