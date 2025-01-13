# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # Python packages
    pkgs.python311                  # Installs Python 3.11
    pkgs.python311Packages.pip      # Installs pip for Python 3.11
    pkgs.python311Packages.virtualenv # Optional: Virtualenv for isolated environments

    # Node.js and npm
    pkgs.nodejs_20                  # Installs Node.js v20
    pkgs.nodePackages.npm           # Installs npm for package management
    pkgs.nodePackages.nodemon       # Installs Nodemon for automatic server restarts

    # Additional tools (optional)
    pkgs.yarn                       # Installs Yarn package manager
  ];

  # Sets environment variables in the workspace
  env = {
    PYTHONPATH = "./src";           # Example: Set Python path for the project
    NODE_ENV = "development";       # Set Node.js environment
  };

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # Python extensions
      "ms-python.python"            # Python extension for debugging and features
      "ms-python.debugpy"           # Debugger support for Python

      # React and Node.js extensions
      "esbenp.prettier-vscode"      # Prettier for formatting
      "dbaeumer.vscode-eslint"      # ESLint for linting JavaScript/TypeScript
      "ms-vscode.vscode-typescript-next" # TypeScript support
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        # Add a preview configuration for the Python server
        python-server = {
          # Replace "app.py" with the entry script for your Python project
          command = ["python3" "app.py"];
          manager = "web";
        };

        # Add a preview configuration for React/Node.js server
        react-server = {
          # Example: Runs "npm start" for a React app
          command = ["npm" "start"];
          manager = "web";
          env = {
            PORT = "$PORT";  # Pass IDX's defined port to the React app
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Setup Python environment and install dependencies
        setup-python-env = "python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt";

        # Install Node.js dependencies
        install-node-deps = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Activate Python virtual environment
        activate-python-env = "source .venv/bin/activate";

        # Start React development server (optional for auto-start)
        start-react-server = "npm start";
      };
    };
  };
}
