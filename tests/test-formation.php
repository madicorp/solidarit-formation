<?php
/**
 * Formation Formation Tests.
 *
 * @since   0.1.0
 * @package Formation
 */
class F_Formation_Test extends WP_UnitTestCase {

	/**
	 * Test if our class exists.
	 *
	 * @since  0.1.0
	 */
	function test_class_exists() {
		$this->assertTrue( class_exists( 'F_Formation') );
	}

	/**
	 * Test that we can access our class through our helper function.
	 *
	 * @since  0.1.0
	 */
	function test_class_access() {
		$this->assertInstanceOf( 'F_Formation', formation()->formation' );
	}

	/**
	 * Test to make sure the CPT now exists.
	 *
	 * @since  0.1.0
	 */
	function test_cpt_exists() {
		$this->assertTrue( post_type_exists( 'f-formation' ) );
	}

	/**
	 * Replace this with some actual testing code.
	 *
	 * @since  0.1.0
	 */
	function test_sample() {
		$this->assertTrue( true );
	}
}
