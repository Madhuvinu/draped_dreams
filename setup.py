from setuptools import setup, find_packages
import os

# Read requirements
with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# Read version from __init__.py without importing
def get_version():
	with open(os.path.join("draped_dreams", "__init__.py")) as f:
		for line in f:
			if line.startswith("__version__"):
				return line.split("=")[1].strip().strip('"').strip("'")
	return "0.0.1"

setup(
	name="draped_dreams",
	version=get_version(),
	description="E-commerce application for saree store",
	author="Draped Dreams",
	author_email="admin@drapeddreams.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
