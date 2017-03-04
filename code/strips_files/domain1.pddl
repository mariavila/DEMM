(define (domain demm)
  (:requirements :strips :adl :typing)
  (:types HEALER INJURED PLACE)
  (:predicates
              (ININJURED ?p - INJURED ?pl - PLACE)
              (INHEALER ?p - HEALER ?pl - PLACE)
              (HEALED ?p - INJURED)
              (MOTIONLESS ?p - INJURED)
  )

  (:action walkinjured
     :parameters (?i - INJURED ?pl1 - PLACE ?pl2 - PLACE)
     :precondition (and (ININJURED ?i ?pl1) (not (MOTIONLESS ?i ) ))
     :effect (and (ININJURED ?i ?pl2) (not (ININJURED ?i ?pl1) ) )
  )

  (:action walkhealer
     :parameters (?h - HEALER ?pl1 - PLACE ?pl2 - PLACE)
     :precondition (and (INHEALER ?h ?pl1))
     :effect (and (INHEALER ?h ?pl2) (not (INHEALER ?h ?pl1) ) )
  )

  (:action heal
    :parameters (?h - HEALER ?i - INJURED ?pl - PLACE)
    :precondition (and  (INHEALER ?h ?pl) (ININJURED ?i ?pl) )
    :effect (HEALED ?i)
  )
)
