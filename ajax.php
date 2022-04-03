<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"));
$request = $data->request;

// Fetch All records
if($request == 'fetch'){
	$collectionData = mysqli_query($con,"select * from collection order by id desc");
	$response = array();
	while($row = mysqli_fetch_assoc($collectionData)){
		$row["showDetail"] = false;
	    $response[] = $row;
	}
	echo json_encode($response);
	exit;
}

// Add collection
if($request == 'add'){
	$name = $data->name;
	$description = $data->description;
	$type = $data->type;
	mysqli_query($con,"INSERT INTO collection(name,description,type) VALUES('".$name."','".$description."','".$type."')");
	echo "Item added successfully";
	exit;
}

// Update record
if($request == 'edit'){
	$id = $data->id;
	$name = $data->name;
	$description = $data->description;
	$type = $data->type;
	
	mysqli_query($con,"UPDATE collection SET name='".$name."', description='".$description."', type='".$type."' WHERE id=".$id);
		 
	echo "Item updated successfully";
	exit;
}

// Delete record
if($request == 'delete'){
	$id = $data->id;
	mysqli_query($con,"DELETE FROM collection WHERE id=".$id);
	echo "Item delete successfully";
	exit;
}
