with import <nixpkgs> {};
#let dsPythonPackages = pythonPackages: with pythonPackages; [
  #jupyter
#];
#in 
stdenv.mkDerivation rec {
  name = "env";
  env = buildEnv {name = name; paths = buildInputs; };
  buildInputs = [
    #(python3.withPackages dsPythonPackages)
    nodejs
  ];
  shellHook = "npm start";
}
