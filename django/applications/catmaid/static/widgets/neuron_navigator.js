/* -*- mode: espresso; espresso-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set softtabstop=2 shiftwidth=2 tabstop=2 expandtab: */

"use strict";

var NeuronNavigator = function()
{
  this.widgetID = this.registerInstance();
  this.registerSource();
};

NeuronNavigator.prototype = {};
$.extend(NeuronNavigator.prototype, new InstanceRegistry());
$.extend(NeuronNavigator.prototype, new SkeletonSource());

/* Implement interfaces */

NeuronNavigator.prototype.getName = function()
{
    return "Neuron Navigator " + this.widgetID;
};

NeuronNavigator.prototype.destroy = function()
{
  this.unregisterInstance();
  this.unregisterSource();
};

NeuronNavigator.prototype.append = function() {};
NeuronNavigator.prototype.clear = function(source_chain) {};
NeuronNavigator.prototype.removeSkeletons = function() {};
NeuronNavigator.prototype.updateModels = function() {};

NeuronNavigator.prototype.getSelectedSkeletons = function() {
  return [];
};

NeuronNavigator.prototype.hasSkeleton = function(skeleton_id) {
  return false;
};

NeuronNavigator.prototype.getSelectedSkeletonModels = function() {
  return {};
};

NeuronNavigator.prototype.highlight = function(skeleton_id)
{
  return;
};

/* Non-interface methods */

NeuronNavigator.prototype.init_ui = function(container)
{
  // Create a navigation bar to see the current path of nodes
  var navigation_bar = document.createElement('div');
  navigation_bar.setAttribute('id', 'navigator_navi_bar' + this.widgetID);
  navigation_bar.setAttribute('class', 'navigator_navi_bar');
  container.appendChild(navigation_bar);

  // Create a containe where all the content of every node will be placed in
  var content = document.createElement('div');
  content.setAttribute('id', 'navigatior_content' + this.widgetID);
  content.setAttribute('class', 'navigator_content');
  container.appendChild(content);

  // Add home node as starting point without any parent
  var home_node = new NeuronNavigatorHomeNode(this.widgetID);
  this.select_node(home_node);
};

NeuronNavigator.prototype.select_node = function(node)
{
  // Set the navigation bar contents
  $('#navigator_navi_bar' + this.widgetID).empty().append(
      node.create_path(this));
  
  // Set the actual content
  $('#navigatior_content' + this.widgetID).empty().append(
      node.create_content(this));
};


/**
 * A class representing a node in the graph of the navigator.
 */
var NeuronNavigatorNode = function(name)
{
  this.name = name;
};

NeuronNavigatorNode.prototype.link = function(parent_node)
{
  this.parent_node = parent_node;
};

NeuronNavigatorNode.prototype.create_path = function(navigator)
{
  var path_link = document.createElement('a');
  path_link.setAttribute('href', '#');
  path_link.setAttribute('class', 'navigator_navi_bar_element');
  path_link.innerHTML = this.name;
  $(path_link).click($.proxy(function() {
    navigator.select_node(this);
  }, this));

  if (this.parent_node) {
    var path_elements = this.parent_node.create_path(navigator);
    path_elements.push(document.createTextNode(" > "));
    path_elements.push(path_link);
    return path_elements;
  } else {
    return [path_link];
  }
};

NeuronNavigatorNode.prototype.create_content = function(navigator)
{
  return undefined;
};

NeuronNavigatorNode.prototype.create_path_link = function(text)
{
  var option = document.createElement('a');
  option.setAttribute('href', '#');
  option.setAttribute('class', 'navigator_content_option');
  // Add text to option, if passed
  if (text)
  {
    option.innerHTML = text;
  }

  return option;
};


/**
 * The home node of the navigator. It links to annotation
 * and users nodes.
 */
var NeuronNavigatorHomeNode = function()
{
  // A home node acts as the root node and has therefore no parent.
  this.link(null);
};

NeuronNavigatorHomeNode.prototype = {};
$.extend(NeuronNavigatorHomeNode.prototype, new NeuronNavigatorNode("Home"));

NeuronNavigatorHomeNode.prototype.create_content = function(navigator)
{
  var content = document.createElement('div');

  var annotations_link = this.create_path_link("Annotations");
  content.appendChild(annotations_link);
  $(annotations_link).click($.proxy(function() {
      var annotations_node = new NeuronNavigatorAnnotationsNode();
      annotations_node.link(this);
      navigator.select_node(annotations_node);
  }, this));

  var users_link = this.create_path_link("Users");
  content.appendChild(users_link);
  $(users_link).click($.proxy(function() {
      var users_node = new NeuronNavigatorUsersNode();
      users_node.link(this);
      navigator.select_node(users_node);
  }, this));

  return content;
};


/**
 * The annotations node of the navigator. It links to annotations.
 */
var NeuronNavigatorAnnotationsNode = function() {};

NeuronNavigatorAnnotationsNode.prototype = {};
$.extend(NeuronNavigatorAnnotationsNode.prototype,
    new NeuronNavigatorNode("Annotations"));

NeuronNavigatorAnnotationsNode.prototype.create_content = function(navigator)
{
  var content = document.createElement('div');
  content.innerHTML = "Annotations node content";

  return content;
};


/**
 * The users node of the navigator. It links to users.
 */
var NeuronNavigatorUsersNode = function() {};

NeuronNavigatorUsersNode.prototype = {};
$.extend(NeuronNavigatorUsersNode.prototype,
    new NeuronNavigatorNode("Users"));

NeuronNavigatorUsersNode.prototype.create_content = function(navigator)
{
  var content = document.createElement('div');
  content.innerHTML = "Users node content";

  return content;
};
