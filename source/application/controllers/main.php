<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class main extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$headData['style']=['public/css/main.css','public/css/font.css'];
		$headData['script']=['public/js/bin/zepto.js','public/js/bin/event.js','public/js/bin/ajax.js','public/js/bin/iscroll-probe.js','public/js/bin/touch.js'];
		$this->load->view('template/style',$headData);
		$this->load->view('template/script',$headData);
		$this->load->view('page/main');
		$footData['script']=['public/js/bin/main.js','public/js/bin/view.js','public/js/bin/route.js'];
		$this->load->view('template/script',$footData);
	}
}
