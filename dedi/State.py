import enum

@enum.unique
class State(enum.Enum):
    PROVISION = 1
    READY = 2
    RUN = 3
    STOP = 4
