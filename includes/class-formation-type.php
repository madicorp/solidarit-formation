<?php
/**
 * Formation Formation_type.
 *
 * @since   0.1.0
 * @package Formation
 */

require_once dirname( __FILE__ ) . '/../vendor/taxonomy-core/Taxonomy_Core.php';

/**
 * Formation Formation_type.
 *
 * @since 0.1.0
 *
 * @see   https://github.com/WebDevStudios/Taxonomy_Core
 */
class F_Formation_type extends Taxonomy_Core {
	/**
	 * Parent plugin class.
	 *
	 * @var    Formation
	 * @since  0.1.0
	 */
	protected $plugin = null;

	/**
	 * Constructor.
	 *
	 * Register Taxonomy.
	 *
	 * See documentation in Taxonomy_Core, and in wp-includes/taxonomy.php.
	 *
	 * @since  0.1.0
	 *
	 * @param  Formation $plugin Main plugin object.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();

		parent::__construct(
			// Should be an array with Singular, Plural, and Registered name.
			array(
				__( 'Type formation', 'formation' ),
				__( 'Types Formation', 'formation' ),
				'f-formation-type',
			),
			// Register taxonomy arguments.
			array(
				'hierarchical' => false,
			),
			// Post types to attach to.
			array(
				'formation',
			)
		);
	}

	/**
	 * Initiate our hooks.
	 *
	 * @since 0.1.0
	 */
	public function hooks() {

	}
}
