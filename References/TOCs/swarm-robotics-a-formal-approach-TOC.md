# Table of Contents — *Swarm Robotics: A Formal Approach* (Heiko Hamann)

## 1 Introduction to Swarm Robotics — p. 1

- 1.1 Initial Approach to Swarm Robotics — p. 4
  - 1.1.1 What Is a Swarm? — p. 4
  - 1.1.2 How Big Is a Swarm? — p. 4
  - 1.1.3 What Is Swarm Robotics? — p. 5
  - 1.1.4 Why Swarm Robotics? — p. 6
  - 1.1.5 What Is Not Swarm Robotics? — p. 9
- 1.2 Early Investigations and Insights — p. 9
  - 1.2.1 Swarm Performance — p. 9
  - 1.2.2 Communication — p. 14
  - 1.2.3 Two Levels: Micro and Macro — p. 14
- 1.3 Self-Organization, Feedbacks, and Emergence — p. 16
  - 1.3.1 Feedbacks — p. 17
  - 1.3.2 Examples of Self-Organizing Systems — p. 19
  - 1.3.3 Emergence — p. 21
- 1.4 Other Sources of Inspiration — p. 22
- 1.5 Homogeneous and Heterogeneous Swarms — p. 23
- 1.6 The Human Factor — p. 24
- 1.7 Implementations in Hardware and Software — p. 25
  - 1.7.1 Example Tasks and Swarm Robotic Projects — p. 25
  - 1.7.2 Simulation Tools — p. 26
  - 1.7.3 Future Applications — p. 27
- 1.8 Further Reading — p. 29
- 1.9 Tasks — p. 29
  - 1.9.1 Task: Scaling of a Computer System — p. 29
  - 1.9.2 Task: Superlinear Speedup — p. 30
  - 1.9.3 Task: Synchronization of a Swarm — p. 31

## 2 Short Introduction to Robotics — p. 33

- 2.1 Components — p. 35
  - 2.1.1 Body and Joints — p. 35
  - 2.1.2 Degrees of Freedom — p. 36
  - 2.1.3 Effector — p. 36
  - 2.1.4 Actuator — p. 36
  - 2.1.5 Sensor — p. 37
- 2.2 Odometry — p. 38
  - 2.2.1 Non-systematic Errors, Systematic Errors, and Calibration — p. 39
  - 2.2.2 The Art of Map Making — p. 39
  - 2.2.3 Excursion: Homing in Ants — p. 40
- 2.3 Kinematics — p. 41
  - 2.3.1 Forward Kinematics — p. 42
  - 2.3.2 Inverse Kinematics — p. 43
- 2.4 Control — p. 43
  - 2.4.1 Trajectory Error Compensation — p. 44
  - 2.4.2 Controllers for Swarm Robots — p. 45
- 2.5 Swarm Robot Hardware — p. 47
  - 2.5.1 s-bot — p. 47
  - 2.5.2 I-SWARM — p. 48
  - 2.5.3 Alice — p. 48
  - 2.5.4 Kilobot — p. 49
  - 2.5.5 Other Swarm Robots — p. 50
- 2.6 Further Reading — p. 53
- 2.7 Tasks — p. 53
  - 2.7.1 Task: Kinematics of Differential Steering — p. 53
  - 2.7.2 Task: Potential Field Control — p. 54
  - 2.7.3 Task: Behaviors of a Single Robot — p. 55

## 3 Short Journey Through Nearly Everything — p. 57

- 3.1 Finite State Machines as Robot Controllers — p. 57
- 3.2 State Transitions Based on Robot–Robot Interactions — p. 58
- 3.3 Early Micro-Macro Problems — p. 59
- 3.4 Minimal Example: Collective Decision-Making — p. 60
- 3.5 Macroscopic Perspective — p. 60
- 3.6 Expected Macroscopic Dynamics and Feedbacks — p. 61
- 3.7 Further Reading — p. 63
- 3.8 Tasks — p. 63
  - 3.8.1 Task: Plot the Macroscopic Dynamic System Behavior — p. 63
  - 3.8.2 Task: Simulate Collective Decision-Making — p. 63

## 4 Scenarios of Swarm Robotics — p. 65

- 4.1 Aggregation and Clustering — p. 66
- 4.2 Dispersion — p. 68
- 4.3 Pattern Formation, Object Clustering, Sorting and Self-Assembly — p. 69
  - 4.3.1 Pattern Formation — p. 69
  - 4.3.2 Clustering — p. 70
  - 4.3.3 Sorting — p. 70
  - 4.3.4 Self-Assembly — p. 72
- 4.4 Collective Construction — p. 73
- 4.5 Collective Transport — p. 75
- 4.6 Collective Manipulation — p. 77
- 4.7 Flocking and Collective Motion — p. 78
- 4.8 Foraging — p. 81
- 4.9 Division of Labor and Task Partitioning/Allocation/Switching — p. 82
- 4.10 Shepherding — p. 85
- 4.11 Heterogeneous Swarms — p. 86
- 4.12 Mixed Societies and Bio-Hybrid Systems — p. 87
- 4.13 Swarm Robotics 2.0 — p. 89
  - 4.13.1 Error Detection and Security — p. 89
  - 4.13.2 Interfacing Robots and Robots as Interface — p. 90
  - 4.13.3 Swarm Robotics as Field Robotics — p. 91
- 4.14 Further Reading — p. 93
- 4.15 Tasks — p. 93
  - 4.15.1 Task: Behaviors of Robot Swarms — p. 93

## 5 Modeling Swarm Systems and Formal Design Methods — p. 95

- 5.1 Introduction to Modeling — p. 96
  - 5.1.1 What Is Modeling? — p. 96
  - 5.1.2 Why Do We Need Models in Swarm Robotics? — p. 97
- 5.2 Local Sampling — p. 99
  - 5.2.1 Sampling in Statistics — p. 100
  - 5.2.2 Sampling in Swarms — p. 101
- 5.3 Modeling Approaches — p. 104
  - 5.3.1 Rate Equation — p. 104
  - 5.3.2 Differential Equations for a Spatial Approach — p. 107
  - 5.3.3 Network Models — p. 113
  - 5.3.4 Network Science and Adaptive Networks — p. 115
  - 5.3.5 Swarm Robots as Biological Models — p. 117
- 5.4 Formal Design Methods — p. 117
  - 5.4.1 Multi-Scale Modeling for Algorithm Design — p. 118
  - 5.4.2 Automatic Design, Learning, and Artificial Evolution — p. 120
  - 5.4.3 Software Engineering and Verification — p. 121
  - 5.4.4 Formal Global-to-Local Programming — p. 123
- 5.5 Further Reading — p. 124
- 5.6 Tasks — p. 124
  - 5.6.1 Task: Beyond Binary Decision-Making — p. 124
  - 5.6.2 Task: Buffon's Needle — p. 125
  - 5.6.3 Task: Local Sampling in a Swarm — p. 125
  - 5.6.4 Task: Dimension Reduction and Modeling — p. 126
  - 5.6.5 Task: Rate Equations — p. 126
  - 5.6.6 Task: Adaptive Networks — p. 127

## 6 Collective Decision-Making — p. 129

- 6.1 Decision-Making — p. 131
- 6.2 Group Decision-Making — p. 132
- 6.3 Group Decision-Making in Animals — p. 133
- 6.4 Collective Motion as Decision Process — p. 135
- 6.5 Models for Collective Decision-Making Processes — p. 136
  - 6.5.1 Urn Models — p. 138
  - 6.5.2 Voter Model — p. 144
  - 6.5.3 Majority Rule — p. 145
  - 6.5.4 Hegselmann and Krause — p. 145
  - 6.5.5 Kuramoto Model — p. 146
  - 6.5.6 Axelrod Model — p. 147
  - 6.5.7 Ising Model — p. 148
  - 6.5.8 Fiber Bundle Model — p. 150
  - 6.5.9 Sznajd Model — p. 151
  - 6.5.10 Bass Diffusion Model — p. 151
  - 6.5.11 Sociophysics and Contrarians — p. 152
- 6.6 Implementations — p. 154
  - 6.6.1 Decision-Making with 100 Robots — p. 154
  - 6.6.2 Collective Perception as Decision-Making — p. 157
  - 6.6.3 Aggregation as Implicit Decision-Making — p. 158
- 6.7 Further Reading — p. 159
- 6.8 Tasks — p. 161
  - 6.8.1 Aggregation at Specified Spot — p. 161
  - 6.8.2 Urn Model for Locust Scenario — p. 161

## 7 Case Study: Adaptive Aggregation — p. 163

- 7.1 Use Case — p. 163
- 7.2 Alternative Solutions — p. 164
  - 7.2.1 Ad-hoc Approach — p. 164
  - 7.2.2 Gradient Ascent — p. 164
  - 7.2.3 Positive Feedback — p. 165
- 7.3 Biological Inspiration: Honeybees — p. 165
- 7.4 Model — p. 167
  - 7.4.1 Modeling Aggregation: Interdisciplinary Options — p. 167
  - 7.4.2 Spatial Model — p. 169
- 7.5 Verification — p. 175
- 7.6 Short Summary — p. 177
- 7.7 Further Reading — p. 177
