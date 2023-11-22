python3 -m venv petpal/env
source petpal/env/bin/activate
pip install -r petpal/requirements.txt
python3 petpal/manage.py makemigrations
python3 petpal/manage.py migrate
