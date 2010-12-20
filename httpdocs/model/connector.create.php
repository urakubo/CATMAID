-------
Create new Connector
 
Input:
- treenode id

Creates:

class_instance
* synapseX <synapse>
* presynaptic terminal X <presynaptic terminal>

location
* new location L

treenode_class_instance
* treenode model_of presynaptic terminal X

location_class_instance
* L model_of synapseX

class_instance_class_instance
* presynaptic terminal X presynaptic_to synapseX

------
Connect treenode to existing location
Input:
- treenode id
- location id

Retrieve:
- synapse_id: if i want to add a synapse, check if location is_a model_of a synapse

Creates:

class_instance
* presynaptic terminal X <presynaptic terminal>

treenode_class_instance
* treenode model_of presynaptic terminal X

class_instance_class_instance
* presynaptic terminal X presynaptic_to synapseX

------
Connect existing connector to new treenode
(first create a new treenode at this position, keep treenode_id and use it
together if the atn which is an activated connectornode)

------
Connect existing connector to existing treenode
(how to catch this event? in the shift-click handler of the target treenode.
use the atn which is an activated connectornode
