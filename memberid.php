<?php
/****************************************************************/
/* ATutor														*/
/****************************************************************/
/* Copyright (c) 2002-2009										*/
/* Inclusive Design Institute                                   */
/* http://atutor.ca												*/
/*                                                              */
/* This program is free software. You can redistribute it and/or*/
/* modify it under the terms of the GNU General Public License  */
/* as published by the Free Software Foundation.				*/
/****************************************************************/

$_user_location	= 'public';

define('AT_INCLUDE_PATH', '../../../include/');
require (AT_INCLUDE_PATH.'vitals.inc.php');


$a = $_SESSION['member_id'];
echo json_encode($a);

exit;

	



?>