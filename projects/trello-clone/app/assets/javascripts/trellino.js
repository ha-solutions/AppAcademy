window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');    
    
    new Trellino.Routers.AppRouter({
      $rootEl: $rootEl
    });

    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
  
  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);
    
    selectorSubviews.push(subview);
    
    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);    
  },
  
  remove: function () {
    Backbone.View.prototype.remove.call(this);
    
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },
  
  removeSubview: function (selector, subview) {
    var selectorSubviews = 
      this.subview()[selector] || (this.subview()[selector] = []);
      
    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },
  
  renderSubviews: function() {
    var view = this;
    
    _(this.subviews()).each(function(selectorSubviews, selector) {
      var $selectorEl = view.$(selector).empty();
      
      _(selectorSubviews).each(function(subview) {
        subview.render();
        subview.delegateEvents();
      });
    });
  },
  
  subviews: function() {
    if (!this._subviews) {
      this._subviews = {};
    };
    
    return this._subviews;
  }
});

$(document).ready(function(){
  Trellino.boards = new Trellino.Collections.Boards();
  
  Trellino.boards.fetch({
    success: function() {      
      Trellino.initialize();
    },
    error: function() {
      alert("didn't work");
    }
  }); 
});