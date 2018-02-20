<?php
/**
 * Formation Inscrit.
 *
 * @since   0.1.0
 * @package Formation
 */

require_once dirname( __FILE__ ) . '/../vendor/cpt-core/CPT_Core.php';
require_once dirname( __FILE__ ) . '/../vendor/cmb2/init.php';

/**
 * Formation Inscrit post type class.
 *
 * @since 0.1.0
 *
 * @see   https://github.com/WebDevStudios/CPT_Core
 */
class F_Inscrit extends CPT_Core {
	/**
	 * Parent plugin class.
	 *
	 * @var Formation
	 * @since  0.1.0
	 */
	protected $plugin = null;

	/**
	 * Constructor.
	 *
	 * Register Custom Post Types.
	 *
	 * See documentation in CPT_Core, and in wp-includes/post.php.
	 *
	 * @since  0.1.0
	 *
	 * @param  Formation $plugin Main plugin object.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();

		// Register this cpt.
		// First parameter should be an array with Singular, Plural, and Registered name.
		parent::__construct(
			array(
				esc_html__( 'Inscrit', 'formation' ),
				esc_html__( 'Inscrits', 'formation' ),
				'f-inscrit',
			),
			array(
                'show_in_menu'=> 'edit.php?post_type=formation',
				'supports' => array(
					'title',
				),
				'menu_icon' => 'dashicons-admin-post', // https://developer.wordpress.org/resource/dashicons/
				'public'    => true,
			)
		);
	}

	/**
	 * Initiate our hooks.
	 *
	 * @since  0.1.0
	 */
	public function hooks() {
		add_action( 'cmb2_init', array( $this, 'fields' ) );
    }

    /**
     * Gets a number of posts and displays them as options
     * @param  array $query_args Optional. Overrides defaults.
     * @return array             An array of options that matches the CMB2 options array
     */
    function cmb2_get_post_options($query_args)
    {

        $args = wp_parse_args($query_args, array(
            'post_type' => 'post',
            'numberposts' => 10,
        ));

        $posts = get_posts($args);

        $post_options = array();
        if ($posts) {
            foreach ($posts as $post) {
                $post_options[$post->ID] = $post->post_title;
            }
        }
        return $post_options;
    }

    /**
     * Gets 5 posts for your_post_type and displays them as options
     * @return array An array of options that matches the CMB2 options array
     */
    function cmb2_get_formation_post_options()
    {
        return $this->cmb2_get_post_options(array('post_type' => 'formation', 'numberposts' => 5));
    }


	/**
	 * Add custom fields to the CPT.
	 *
	 * @since  0.1.0
	 */
	public function fields() {

		// Set our prefix.
		$prefix = 'f_inscrit_';

		// Define our metaboxes and fields.
		$cmb = new_cmb2_box( array(
			'id'            => $prefix . 'metabox',
			'title'         => esc_html__( 'Inscrit Meta Box', 'formation' ),
			'object_types'  => array( 'f-inscrit' ),
		) );

        $cmb->add_field( array(
            'name' => 'Email',
            'id'   => $prefix . '_person_email',
            'type' => 'text_email',
        ) );

        $cmb->add_field( array(
            'name' => 'Telephone',
            'id'   => $prefix . '_person_phone',
            'type' => 'text_medium',
        ) );


        $cmb->add_field(array(
            'name' => __('Formation inscrite', 'cmb2'),
            'desc' => __('', 'cmb2'),
            'id' => $prefix . '_person_formation',
            'type' => 'select',
            'options' => array($this, 'cmb2_get_formation_post_options'),
        ));

	}

	/**
	 * Registers admin columns to display. Hooked in via CPT_Core.
	 *
	 * @since  0.1.0
	 *
	 * @param  array $columns Array of registered column names/labels.
	 * @return array          Modified array.
	 */
	public function columns( $columns ) {
		$new_column = array();
		return array_merge( $new_column, $columns );
	}

	/**
	 * Handles admin column display. Hooked in via CPT_Core.
	 *
	 * @since  0.1.0
	 *
	 * @param array   $column   Column currently being rendered.
	 * @param integer $post_id  ID of post to display column for.
	 */
	public function columns_display( $column, $post_id ) {
		switch ( $column ) {
		}
	}
}
