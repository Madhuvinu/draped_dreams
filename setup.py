from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in draped_dreams/__init__.py
from draped_dreams import __version__ as version

setup(
	name="draped_dreams",
	version=version,
	description="E-commerce application for saree store",
	author="Draped Dreams",
	author_email="admin@drapeddreams.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
