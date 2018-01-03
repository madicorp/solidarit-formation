<?php
/**
 * Formation Formation_type Tests.
 *
 * @since   0.1.0
 * @package Formation
 */
class F_Formation_type_Test extends WP_UnitTestCase {

	/**
	 * Test if our class exists.
	 *
	 * @since  0.1.0
	 */
	function test_class_exists() {
		$this->assertTrue( class_exists( 'F_Formation_type') );
	}

	/**
	 * Test that we can access our class through our helper function.
	 *
	 * @since  0.1.0
	 */
	function test_class_access() {
		$this->assertInstanceOf( 'F_Formation_type', formation()->formation-type );
	}

	/**
	 * Test that our taxonomy now exists.
	 *
	 * @since  0.1.0
	 */
	function test_taxonomy_exists() {
		$this->assertTrue( taxonomy_exists( 'f-formation-type' ) );
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
