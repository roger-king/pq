"""game: is_started

Revision ID: c2cee10e456e
Revises: 3692275abc73
Create Date: 2020-12-18 09:25:55.857409

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c2cee10e456e'
down_revision = '3692275abc73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('games', sa.Column('is_started', sa.Boolean(), nullable=True))
    op.execute("UPDATE games SET is_started = false")
    op.alter_column('games', 'is_started', nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('games', 'is_started')
    # ### end Alembic commands ###
