{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; #stable-24.05"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_24
    pkgs.pnpm
    pkgs.lazygit
    pkgs.neovim
    pkgs.lf
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "svelte.svelte-vscode"
      "asvetliakov.vscode-neovim"
      "JustinDBoyson.openinvim"
      "bradlc.vscode-tailwindcss"
      "harshkothari.svelte-radar"
      "RafaelMartinez.svelte-preview"
      "Selemondev.vscode-shadcn-svelte"
      "svelte.svelte-vscode-nightly"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/App.svelte" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
