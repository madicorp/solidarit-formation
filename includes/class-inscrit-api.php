<?php
/**
 * Formation Inscrit_api.
 *
 * @since   0.1.0
 * @package Formation
 */

/**
 * Endpoint class.
 *
 * @since   0.1.0
 * @package Formation
 */
if (class_exists('WP_REST_Controller')) {
    class F_Inscrit_api extends WP_REST_Controller
    {
        /**
         * Parent plugin class.
         *
         * @var   Formation
         * @since 0.1.0
         */
        protected $plugin = null;

        /**
         * Constructor.
         *
         * @since  0.1.0
         *
         * @param  Formation $plugin Main plugin object.
         */
        public function __construct($plugin)
        {
            $this->plugin = $plugin;
            $this->hooks();
        }

        /**
         * Add our hooks.
         *
         * @since  0.1.0
         */
        public function hooks()
        {
            add_action('rest_api_init', array($this, 'register_routes'));
        }

        /**
         * Register the routes for the objects of the controller.
         *
         * @since  0.1.0
         */
        public function register_routes()
        {

            // Set up defaults.
            $version = '2';
            $namespace = 'formation/v' . $version;
            $base = 'inscrit-api';


            // Example register_rest_route calls.
            register_rest_route($namespace, '/' . $base, array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_items'),
                    'permission_callback' => array($this, 'get_items_permission_check'),
                    'args' => array(),
                ),
                array(
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => array($this, 'create_item'),
                    'permission_callback' => array($this, 'create_item_permissions_check'),
                    'args' => $this->get_endpoint_args_for_item_schema(false),
                )
            ));

            register_rest_route($namespace, '/' . $base . '/(?P<id>[\d]+)', array(
                    array(
                        'methods' => WP_REST_Server::READABLE,
                        'callback' => array($this, 'get_item'),
                        'permission_callback' => array($this, 'get_item_permissions_check'),
                        'args' => array(
                            'context' => array(
                                'default' => 'view',
                            ),
                        ),
                    ),
                    array(
                        'methods' => WP_REST_Server::EDITABLE,
                        'callback' => array($this, 'update_item'),
                        'permission_callback' => array($this, 'update_item_permissions_check'),
                        'args' => $this->get_endpoint_args_for_item_schema(false),
                    ),
                    array(
                        'methods' => WP_REST_Server::DELETABLE,
                        'callback' => array($this, 'delete_item'),
                        'permission_callback' => array($this, 'delete_item_permissions_check'),
                        'args' => array(
                            'force' => array(
                                'default' => false,
                            ),
                        ),
                    ),
                )
            );
        }

        /**
         * Get items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function get_items($request)
        {
        }

        /**
         * Permission check for getting items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
        public function get_items_permission_check($request)
        {
            return true;
        }

        /**
         * Get item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function get_item($request)
        {
        }

        /**
         * Permission check for getting item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function get_item_permissions_check($request)
        {
        }


        /**
         * Create item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return WP_REST_Response
         */
        public function create_item($request)
        {
            $params = $request->get_body_params();

            $prefix = 'f_inscrit_';

            $post_id = wp_insert_post( array(
                'post_title'    => $params['name'],
                'post_type'     => 'f-inscrit',
                'post_status'   => 'publish',
            ) );

            add_post_meta($post_id, $prefix.'_person_email', $params['email'], true);
            add_post_meta($post_id, $prefix.'_person_phone', $params['phone'], true);
            add_post_meta($post_id, $prefix . '_person_formation', $params['formation'], true);

            add_post_meta($params['formation'], 'f_formation_inscrits', $post_id, true);


            return new WP_REST_Response( $post_id, 200 );
        }

        /**
         * Permission check for Creating items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
        public function create_item_permissions_check($request)
        {
            return true;
        }

        /**
         * Update item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function update_item($request)
        {
        }

        /**
         * Permission check for updating items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function update_item_permissions_check($request)
        {
        }

        /**
         * Delete item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function delete_item($request)
        {
        }

        /**
         * Permission check for deleting items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function delete_item_permissions_check($request)
        {
        }

    }
}
