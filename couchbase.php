<?php
// adjust these parameters to match your installation
$cb = new Couchbase("127.0.0.1:8091", "", "", "default");
$cb->set("a", 101);
var_dump($cb->get("a"));
?>