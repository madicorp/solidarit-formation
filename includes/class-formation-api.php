<?php
/**
 * Formation Formation_api.
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
if ( class_exists( 'WP_REST_Controller' ) ) {
	class F_Formation_api extends WP_REST_Controller {
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
		public function __construct( $plugin ) {
			$this->plugin = $plugin;
			$this->hooks();
		}

		/**
		 * Add our hooks.
		 *
		 * @since  0.1.0
		 */
		public function hooks() {
			add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		}

		/**
	     * Register the routes for the objects of the controller.
	     *
	     * @since  0.1.0
	     */
		public function register_routes() {

			// Set up defaults.
			$version = '2';
			$namespace = 'formation/v' . $version;
			$base = 'formation-api';


			// Example register_rest_route calls.
			register_rest_route( $namespace, '/' . $base, array(
				array(
					'methods' => WP_REST_Server::READABLE,
					'callback' => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permission_check' ),
					'args' => array(),
				),
			) );

			register_rest_route( $namespace, '/' . $base . '/(?P<id>[\d]+)', array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args'                => array(
						'context' => array(
							'default' => 'view',
						),
					),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'update_item_permissions_check' ),
					'args'                => $this->get_endpoint_args_for_item_schema( false ),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'delete_item_permissions_check' ),
					'args'                => array(
						'force' => array(
							'default' => false,
							),
						),
					),
				)
			);
		}

        function prepare_result_for_response($result, $request)
        {
            return $result;
        }

        /**
         * Get items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return WP_REST_Response
         */
		public function get_items( $request ) {

            $args = array(
                'post_type' => 'formation',);
            $query = new WP_Query($args);
            $data = $this->prepare_result_for_response($query->get_posts(), $request);

            return new WP_REST_Response($data, 200);
        }

        /**
         * Permission check for getting items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
		public function get_items_permission_check( $request ) {
		    return true;
        }

        /**
         * Get item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return WP_REST_Response
         */
		public function get_item( $request ) {
            $params = $request->get_params();
            $args = array(
                'post_type' => 'formation',
                'p' => $params["id"]
            );
            $query = new WP_Query($args);
            $data = $this->prepare_result_for_response($query->get_posts(), $request);

            return new WP_REST_Response($data, 200);
        }

        /**
         * Permission check for getting item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
		public function get_item_permissions_check( $request ) {
		    return true;
        }

		/**
		 * Update item.
		 *
		 * @since  0.1.0
		 *
		 * @param  WP_REST_Request $request Full details about the request.
		 */
		public function update_item( $request ) {}

		/**
		 * Permission check for updating items.
		 *
		 * @since  0.1.0
		 *
		 * @param  WP_REST_Request $request Full details about the request.
		 */
		public function update_item_permissions_check( $request ) {}

		/**
		 * Delete item.
		 *
		 * @since  0.1.0
		 *
		 * @param  WP_REST_Request $request Full details about the request.
		 */
		public function delete_item( $request ) {}

		/**
		 * Permission check for deleting items.
		 *
		 * @since  0.1.0
		 *
		 * @param  WP_REST_Request $request Full details about the request.
		 */
		public function delete_item_permissions_check( $request ) {}

	}
}
