<?php
/**
 * Formation Formation.
 *
 * @since   0.1.0
 * @package Formation
 */

require_once dirname(__FILE__) . '/../vendor/cpt-core/CPT_Core.php';
require_once dirname(__FILE__) . '/../vendor/cmb2/init.php';

/**
 * Formation Formation post type class.
 *
 * @since 0.1.0
 *
 * @see   https://github.com/WebDevStudios/CPT_Core
 */
class F_Formation extends CPT_Core
{
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
    public function __construct($plugin)
    {
        $this->plugin = $plugin;
        $this->hooks();

        // Register this cpt.
        // First parameter should be an array with Singular, Plural, and Registered name.
        parent::__construct(
            array(
                esc_html__('Formation', 'formation'),
                esc_html__('Formations', 'formation'),
                'formation',
            ),
            array(
                'supports' => array(
                    'title',
                    'editor',
                    'thumbnail',
                ),
                'menu_icon' => 'dashicons-welcome-learn-more', // https://developer.wordpress.org/resource/dashicons/
                'public' => true,
            )
        );
    }

    /**
     * Initiate our hooks.
     *
     * @since  0.1.0
     */
    public function hooks()
    {
        add_action('init', array($this, 'f_formation_rest_support'), 25);
        add_action('cmb2_init', array($this, 'fields'));

        add_filter('single_template', array($this, 'get_formation_board_single_template'));
        add_filter('archive_template', array($this, 'get_formation_board_archive_template'));

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
    function cmb2_get_inscrit_post_options()
    {
        return $this->cmb2_get_post_options(array('post_type' => 'f-inscrit', 'numberposts' => 5));
    }

    /**
     * Add custom fields to the CPT.
     *
     * @since  0.1.0
     */
    public function fields()
    {

        // Set our prefix.
        $prefix = 'f_formation_';

        // Define our metaboxes and fields.
        $cmb = new_cmb2_box(array(
            'id' => $prefix . 'metabox',
            'title' => esc_html__('Formation Meta Box', 'formation'),
            'object_types' => array('formation'),
        ));
        $group_formation_speaker_id = $cmb->add_field(array(
            'id' => 'formation_speaker',
            'type' => 'group',
            'description' => __('Formateur', 'cmb2'),
            'repeatable'  => false, // use false if you want non-repeatable group
            'options' => array(
                'group_title' => __('Formateur de la session', 'cmb2'), // since version 1.1.4, {#} gets replaced by row number
            ),
        ));

        // Id's for group's fields only need to be unique for the group. Prefix is not needed.
        $cmb->add_group_field($group_formation_speaker_id, array(
            'name' => 'Nom du formateur',
            'id' => 'name',
            'type' => 'text',
            // 'repeatable' => true, // Repeatable fields are supported w/in repeatable groups (for most types)
        ));

        $cmb->add_group_field($group_formation_speaker_id, array(
            'name' => 'Fonction',
            'id' => 'office',
            'type' => 'text',
        ));
        $cmb->add_field(array(
            'name' => 'Date de debut',
            'id' => $prefix . 'post_start_date',
            'type' => 'text_datetime_timestamp',
        ));
        $cmb->add_field(array(
            'name' => 'Date de fin',
            'id' => $prefix . 'post_end_date',
            'type' => 'text_datetime_timestamp',
        ));
        $cmb->add_field(array(
            'name' => __('La liste des inscrits', 'cmb2'),
            'desc' => __('', 'cmb2'),
            'id' => $prefix . 'inscrits',
            'type' => 'multicheck',
            'options' => array($this, 'cmb2_get_inscrit_post_options'),
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
    public function columns($columns)
    {
        $new_column = array();
        return array_merge($new_column, $columns);
    }

    /**
     * Handles admin column display. Hooked in via CPT_Core.
     *
     * @since  0.1.0
     *
     * @param array $column Column currently being rendered.
     * @param integer $post_id ID of post to display column for.
     */
    public function columns_display($column, $post_id)
    {
        switch ($column) {
        }
    }

    /**
     * To load single job page in frontend.
     *
     * @since   2.2.0
     *
     * @param   string $single_template Default Single Page Path.
     * @return  string  $single_template    Plugin Single Page Path.
     */
    function get_formation_board_single_template($single_template)
    {

        global $post;

        if ('formation' === $post->post_type) {
            $single_template = (!file_exists(get_stylesheet_directory() . '/formation/single-formation.php')) ?
                untrailingslashit(plugin_dir_path(dirname(__FILE__))) . '/templates/single-formation.php' :
                get_stylesheet_directory() . '/formation/single-formation.php';
        }
        return $single_template;
    }


    /**
     * To load archive job page in frontend.
     *
     * @since   2.2.0
     *
     * @param   string $archive_template Default Archive Page Path.
     * @return  string  $archive_template   Plugin Archive Page Path.
     */
    function get_formation_board_archive_template($archive_template)
    {

        if (is_post_type_archive('formation')) {
            $archive_template = (!file_exists(get_stylesheet_directory() . '/formation/archive-formation.php')) ?
                untrailingslashit(plugin_dir_path(dirname(__FILE__))) . '/templates/archive-formation.php' :
                get_stylesheet_directory() . '/formation/archive-formation.php';
        }
        return $archive_template;
    }

    function f_formation_rest_support()
    {
        global $wp_post_types;

        //be sure to set this to the name of your post type!
        $post_type_name = 'formation';
        if (isset($wp_post_types[$post_type_name])) {
            $wp_post_types[$post_type_name]->show_in_rest = true;
            $wp_post_types[$post_type_name]->rest_base = $post_type_name;
            $wp_post_types[$post_type_name]->rest_controller_class = 'F_Formation_api';
        }


    }
}
