(define (problem xorra)
  (:domain demm)
  (:objects
    h1 h2 h3- HEALER
    i1 i2 i3 i4 i5- INJURED
    p1 p2 p3 p4 - PLACE
  )
  (:init
            (INHEALER h1 p1)
            (INHEALER h2 p1)

            (ININJURED i1 p2)
            (ININJURED i2 p2)
            (ININJURED i3 p3)
            (ININJURED i4 p3)
            (ININJURED i5 p4)

            (MOTIONLESS i5)
  )
  (:goal  (and (HEALED i1)(HEALED i2)(HEALED i3)(HEALED i4)(HEALED i5) ) )
)
