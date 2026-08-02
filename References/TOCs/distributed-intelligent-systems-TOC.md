# Syllabus — Distributed Intelligent Systems (EPFL, A. Martinoli)

## Week 1 — September 9 and 11

**Lecture** (2h Tue in GR C0 01, 2h Thu in AAC 0 08)

Course organization (credits, workload, logistics) and content overview. Introduction to Swarm Intelligence (SI) and key principles, natural and artificial examples. Foraging, trail laying/following mechanisms. Open-space, multi-source foraging experiments: biological data and microscopic models. Collective movements, flocking in natural societies.

**Reading — Primary**

- Bonabeau E., Dorigo M., and Theraulaz G., "Swarm Intelligence: From Natural to Artificial Systems", Santa Fe Studies in the Sciences of Complexity, Oxford University Press, 1999, Ch. 1 (pp. 1-23) and Ch. 2 (pp. 25-36).
- Martinoli A., "Collective Complexity out of Individual Simplicity". Invited book review on "Swarm Intelligence: From Natural to Artificial Systems", by Bonabeau E., Dorigo M., and Theraulaz G. Artificial Life, Vol. 7, No. 3, pp. 315-319, 2001.

**Reading — Secondary**

- Beni G., "From Swarm Intelligence to Swarm Robotics". In Şahin E. and Spears W., editors, Proc. of the SAB 2004 Workshop on Swarm Robotics, Santa Monica, CA, USA, July 2004. Lecture Notes in Computer Science (2005), Vol. 3342, pp. 1-9.

**Lab** — No exercises.

## Week 2 — September 16 and 18

**Lecture**

Ant-based algorithms applied to classical operational research problems (e.g., TSP) and routing in telecommunication networks: the AS, ACS, ACS-3-Opt, and Ant-Net algorithms; the Ant Colony Optimization (ACO) metaheuristic as an example of successful translation of Swarm Intelligence principles to powerful metaheuristic algorithms.

**Reading — Primary**

- Bonabeau E., Dorigo M., and Theraulaz G., "Swarm Intelligence: From Natural to Artificial Systems", Santa Fe Studies in the Sciences of Complexity, Oxford University Press, 1999, Ch. 2 (pp. 39-56 and pp. 93-107).

**Reading — Secondary**

- Dorigo M. and Stützle T., "Ant Colony Optimization", MIT Press, 2004, Ch. 1 (pp. 1-24) and Ch. 2 (pp. 25-46).
- Dorigo M. and Stützle T., "Ant Colony Optimization: Overview and Recent Advances". M. Gendreau and Y. Potvin, editors, Handbook of Metaheuristics, 3rd edition, Springer Verlag, 2019, Vol. 272, pp. 311-351.

**Lab 1** — Trail laying and following mechanisms, emphasizing SI concepts; Ant Colony Optimization.

## Week 3 — September 23 and 25

**Lecture**

Introduction to mobile robotics: basic concepts centered around the differential drive vehicle considered in the course (e-puck) and the high-fidelity, open-source robotic simulator (Webots). Introduction to control architecture for mobile robots with special focus on reactive control architectures.

**Reading — Primary**

- Michel O., "Webots: Professional Mobile Robot Simulation". Int. J. of Advanced Robotic Systems, 1: 39-42, 2004.
- Siegwart R. and Nourbakhsh I. R., "Introduction to Autonomous Mobile Robots", MIT Press, 2004, Ch. 4 (pp. 89-98).
- Mondada F., Bonani M., Raemy X., Pugh J., Cianci C., Klaptocz A., Magnenat S., Zufferey J.-C., Floreano D., Martinoli A., "The e-puck, a Robot Designed for Education in Engineering". Proc. of the 9th Conference on Autonomous Robot Systems and Competitions, May 2009, Castelo Branco, Portugal, Vol. 1, pp. 59-65.

**Reading — Secondary**

- Brooks R., "A Robust Layered Control System for a Mobile Robot". IEEE Trans. on Robotics and Automation, 2(1): 14-23, 1986.
- Arkin R. C., "Motor Schema Based Mobile Robot Navigation". Int. J. of Robotics Research, 8(4): 92-112, 1989.

**Lab 2** — Introduction to Webots, an open-source, high-fidelity robotic simulator.

## Week 4 — September 30 and October 2

**Lecture**

Localization methods in mobile robotics: positioning systems, odometry-based and feature-based localization. Sources of localization uncertainties and corresponding handling methods in 1D (Kalman Filter).

**Reading — Primary**

- Maybeck P. S., "Stochastic Models, Estimation, and Control", Academic Press, 1979, Ch. 1 (pp. 1-16).
- Siegwart R. and Nourbakhsh I. R., "Introduction to Autonomous Mobile Robots", MIT Press, 2004, Ch. 3 (pp. 47-53), Ch. 4 (pp. 102-103, 145-154), Ch. 5 (pp. 227-233).

**Reading — Secondary**

- None

**Lab 3** — Localization methods (odometry and feature-based localization) for single robots.

## Week 5 — October 7 and 9

**Lecture**

Multi-dimensional Kalman Filter, localization uncertainties in wheel-based odometry, and corresponding handling methods (Extended Kalman Filter). Collective movements in artificial systems: Reynolds' virtual agents (Boids), experiments with multi-robot systems on flocking and formation (behavior-based); graph-based formalism for consensus-based algorithms (rendez-vous, formation).

**Reading — Primary**

- Reynolds C. W., "Flocks, Herds, and Schools: A Distributed Behavioral Model, in Computer Graphics", Proc. of SIGGRAPH '87, 21(4), pp. 25-34, 1987.
- Siegwart R. and Nourbakhsh I. R., "Introduction to Autonomous Mobile Robots", MIT Press, 2004, Ch. 5 (pp. 181-191).
- Thrun S., Burgard W., and Fox D., "Probabilistic Robotics", MIT Press, preprint, 2002, Ch. 3 (pp. 33-39, pp. 48-51 and 62-65).
- Gowal S., "A Framework for Graph-Based Distributed Rendezvous of Nonholonomic Multi-Robot Systems", EPFL Thesis no. 5845, Ch. 6 and 7 (pp. 49-60), 2013.

**Reading — Secondary**

- Fredslund J. and Matarić M. J., "A General, Local Algorithm for Robot Formations", IEEE Transactions on Robotics and Automation, special issue on Advances in Multi-Robot Systems, Vol. 18, No. 5, pp. 837-846, 2002.
- Siegwart R. and Nourbakhsh I. R., "Introduction to Autonomous Mobile Robots", MIT Press, 2004, Ch. 5 (pp. 212-214, 233-244).
- Falconi R., Gowal S., and Martinoli A., "Graph-Based Distributed Control of Non-Holonomic Vehicles Endowed with Local Positioning Information Engaged in Escorting Missions". Proc. of the 2010 IEEE Int. Conf. on Robotics and Automation, May 2010, Anchorage, AK, U.S.A., pp. 3207-3214.
- Gowal S., "A Framework for Graph-Based Distributed Rendezvous of Nonholonomic Multi-Robot Systems", EPFL Thesis no. 5845, Ch. 9-10 (pp. 69-78), 2013.

**Lab 4** — Collective movements (flocking, formations).

## Week 6 — October 14 and 16

**Lecture**

Division of labor and task-allocation mechanisms: threshold-based and market-based algorithms.

**Reading — Primary**

- Stentz A., Dias M. B., "A Free Market Architecture for Coordinating Multiple Robots". Technical report CMU-RI-TR-99-42, Robotics Institute, Carnegie Mellon University, December 1999.
- Bonabeau E., Dorigo M., and Theraulaz G., "Swarm Intelligence: From Natural to Artificial Systems", Santa Fe Studies in the Sciences of Complexity, Oxford University Press, 1999, pp. 109-139 (Chapter 3).
- Kalra N. and Martinoli A., "A Comparative Study between Threshold-Based and Market-Based Task Allocation". Proc. of the Eighth Int. Symp. on Distributed Autonomous Robotic Systems, July 2006, Minneapolis/St. Paul, MN, U.S.A. Distributed Autonomous Robotic Systems 7 (2006), pp. 91-102.

**Reading — Secondary**

- Agassounon W. and Martinoli A., "Efficiency and Robustness of Threshold-Based Distributed Allocation Algorithms in Multi-Agent Systems". Proc. of the First ACM Int. Joint Conf. on Autonomous Agents and Multi-Agent Systems, July 2002, Bologna, Italy, pp. 1090-1097.
- Dias M. B., Zlot R., Kalra N., and Stentz A., "Market-Based Multirobot Coordination: A Survey and Analysis". IEEE Proceedings, 94(7): 1257-1270, 2006.

**Lab 5** — Multi-robot systems coordination using market-based and threshold-based algorithms.

**Project** — Disclosure of course project assignment, opening of course project enrollment.

## Week 7 — October 28 and 30

**Lecture**

Static wireless sensor networks.

**Reading — Primary**

- Barrenetxea G., Ingelrest F., Schaefer G. and Vetterli M., "The Hitchhiker's Guide to Successful Wireless Sensor Network Deployments". Proc. of the 6th ACM Conference on Embedded Networked Sensor Systems (SenSys 2008), Raleigh, NC, USA, 5-7 November 2008.
- Evans W. C., Bahr A., and Martinoli A., "Evaluating Efficient Data Collection Algorithms for Environmental Sensor Networks". Proc. of the Tenth Int. Symp. on Distributed Autonomous Robotic Systems, November 2010, Lausanne, Switzerland; Springer Tracts in Advanced Robotics (2013), Vol. 83, pp. 77-90.
- Evans W. C., Bahr A., and Martinoli A., "Distributed Spatiotemporal Suppression for Environmental Data Collection in Real-World Sensor Networks". Proc. of the 2013 IEEE Int. Conf. on Distributed Computing in Sensor Systems, May 2013, Boston, U.S.A., pp. 70-79.

**Reading — Secondary**

- Culler D., Estrin D., and Srivastava M., "Guest Editors' Introduction: Overview of Sensor Networks". IEEE Computer, Vol. 37, No. 8, pp. 41-49, 2004.

**Lab** — Kick-off of course project: guidelines, material, definitive assignment of teams and topics.

## Week 8 — November 4 and 6

**Lecture**

Mobile and robotic sensor networks (focus on gas sensing, 2D and 3D).

**Reading — Primary**

- Arfire A., Marjovi A., and Martinoli A., "Mitigating Slow Dynamics of Low-Cost Chemical Sensors for Mobile Air Quality Monitoring Sensor Networks". Proc. of the Int. Conf. on Embedded Wireless Systems and Networks, February 2016, Graz, Austria, pp. 159-167.
- Marjovi A., Arfire A., and Martinoli A., "Extending Urban Air Pollution Maps beyond the Coverage of a Mobile Sensor Network: Data Sources, Methods, and Performance Evaluation". Proc. of the Int. Conf. on Embedded Wireless Systems and Networks, February 2017, Uppsala, Sweden, pp. 12-23.
- Lochmatter T. and Martinoli A., "Tracking an Odor Plume in a Laminar Wind Field with Bio-Inspired Algorithms". Proc. of the Eleventh Int. Symp. Experimental Robotics, July 2008, Athens, Greece, Springer Tracts in Advanced Robotics (2008), Vol. 54, pp. 473-482, 2008.
- Soares J. M., Aguiar A. P., Pascoal A. M., and Martinoli A., "A Distributed Formation-based Odor Source Localization Algorithm — Design, Implementation, and Wind Tunnel Evaluation". Proc. IEEE Int. Conf. on Robotics and Automation, 2015, pp. 1830-1836.
- Rahbar F. and Martinoli A., "A Distributed Source Term Estimation Algorithm for Multi-Robot Systems". Proc. of the IEEE Int. Conf. on Robotics and Automation, May-August 2020, Paris, France, online organization, pp. 5604-5610.

**Reading — Secondary**

- Marjovi A., Arfire A., and Martinoli A., "High Resolution Air Pollution Maps in Urban Environments using Mobile Sensor Networks". Proc. of the 11th International Conference on Distributed Computing in Sensor Systems, June 2015, Fortaleza, Brazil, pp. 11-20.
- Ercolani C. and Martinoli A., "3D Odor Source Localization using a Micro Aerial Vehicle: System Design and Performance Evaluation". Proc. of the IEEE/RSJ Int. Conf. on Intelligent Robots and Systems, October 2020, Las Vegas, NV, USA, online organization, pp. 6194-6200.
- Ercolani C., Jin W., and Martinoli A., "3D Gas Sensing with Multiple Nano Aerial Vehicles: Interference Analysis, Algorithms and Experimental Validation". Special Issue on Robotics for Environment Sensing, Neumann P. P., editor, Sensors, 23(20): 8512 (22 pages), 2023.

**Lab 6** — Distributed sensing with static, mobile, robotic sensor networks.

## Week 9 — November 11 and 13

**Lecture**

Introduction to multi-level modeling techniques: underlying theoretical framework, levels, assumptions, design principles and parameter calibration. Linear case studies.

**Reading — Primary**

- Lerman K., Martinoli A., and Galstyan A., "A Review of Probabilistic Macroscopic Models for Swarm Robotic Systems". In Şahin E. and Spears W., editors, Proc. of the SAB 2004 Workshop on Swarm Robotics, July 2004, Santa Monica, CA, USA. Lecture Notes in Computer Science (2005), Vol. 3342, pp. 143-152.
- Martinoli A., Easton K., and Agassounon W., "Modeling of Swarm Robotic Systems: A Case Study in Collaborative Distributed Manipulation". Special Issue on Experimental Robotics, Siciliano B., editor, Int. Journal of Robotics Research, Vol. 23, No. 4, pp. 415-436, 2004.

**Reading — Secondary**

- Correll N. and Martinoli A., "Collective Inspection of Regular Structures using a Swarm of Miniature Robots". In Ang Jr., M. H. and Khatib, O., editors, Proc. of the Ninth Int. Symp. Experimental Robotics, June 2004, Singapore. Springer Tracts in Advanced Robotics (2006), Vol. 21, pp. 375-385.

**Lab 7** — Multi-level modeling of swarm robotic systems — Introduction.

## Week 10 — November 18 and 20

**Lecture**

Selected nonlinear case studies for multi-level modeling. Combined modeling and learning methods for control optimization.

**Reading — Primary**

- Agassounon W., Martinoli A., and Easton K., "Macroscopic Modeling of Aggregation Experiments using Embodied Agents in Teams of Constant and Time-Varying Sizes". Autonomous Robots, special issue on Swarm Robotics, Dorigo M. and Şahin E., editors, 17(2-3): 163-192, 2004.
- Li L., Martinoli A., and Abu-Mostafa Y., "Learning and Measuring Specialization in Collaborative Swarm Systems". Special issue on Mathematics and Algorithms of Social Insects, Balch T. and Anderson C., editors, Adaptive Behavior, Vol. 12, No. 3-4, pp. 199-212, 2004.

**Reading — Secondary**

- Martinoli A., Ijspeert A. J., and Gambardella L. M., "A Probabilistic Model for Understanding and Comparing Collective Aggregation Mechanisms". In Floreano D., Mondada F., and Nicoud J.-D., editors, Proc. of the Fifth Europ. Conf. on Artificial Life, September 1999, Lausanne, Switzerland. Lecture Notes in Artificial Intelligence (1999), Vol. 1674, pp. 575-584.

**Lab 8** — Multi-level modeling of swarm robotic systems — Advanced.

## Week 11 — November 25 and 27

**Lecture**

Diversity and specialization metrics in heterogeneous swarm systems. Introduction to evaluative machine-learning techniques for automatic design and optimization: terminology and classification. Particle Swarm Optimization (PSO): algorithm and performance evaluation. Application of metaheuristic learning techniques to automatic control design and optimization of single-robot systems.

**Reading — Primary**

- Eberhart R. C. and Kennedy J., "A New Optimizer using Particle Swarm Theory". Proc. of the Sixth IEEE Int. Symp. Micro Machine and Human Science, Nagoya, Japan, 1995, pp. 39-43.
- Shi Y. H. and Eberhart R. C., "A Modified Particle Swarm Optimizer". Proc. of the IEEE International Conference on Evolutionary Computation, Anchorage, Alaska, May 1998, pp. 69-73.
- Pugh J., Zhang Y., and Martinoli A., "Particle Swarm Optimization for Unsupervised Robotic Learning". Proc. of the Second IEEE Symp. on Swarm Intelligence, Pasadena, CA, USA, June 2005, pp. 92-99.
- Engelbrecht A. P., "Particle Swarm Optimization: Where Does it Belong?" Proc. of the Third IEEE Symp. on Swarm Intelligence, Indianapolis, IN, USA, May 2006, pp. 48-54.

**Reading — Secondary**

- Poli R., Kennedy J., and Blackwell T., "Particle Swarm Optimization: An Overview". Swarm Intelligence Journal, 1(1): 33-57, 2007.
- Floreano D. and Mondada F., "Evolution of Homing Navigation in a Real Mobile Robot". IEEE Trans. on System, Man, and Cybernetics: Part B, 26(3): 396-407, 1996.
- Jornod G., Di Mario E., Navarro I., and Martinoli A., "SwarmViz: An Open-Source Visualization Tool for Particle Swarm Optimization". Proc. of the 2015 IEEE Congress on Evolutionary Computation, May 2015, Sendai, Japan, pp. 179-186.

**Lab 9** — Particle Swarm Optimization: application to benchmark functions and control shaping for single robot.

## Week 12 — December 2 and 4

**Lecture**

Noisy and expensive optimization problems. Application of metaheuristic learning techniques to automatic control design and optimization of multi-robot systems. Specific issues for automatic control design and optimization in distributed systems.

**Reading — Primary**

- Pugh J. and Martinoli A., "Distributed Scalable Multi-Robot Learning using Particle Swarm Optimization". Swarm Intelligence Journal, 3(3): 203-222, 2009.
- Di Mario E. and Martinoli A., "Distributed Particle Swarm Optimization for Limited Time Adaptation with Real Robots". Chirikjian G. and Hsieh A., editors, Special issue on Distributed Robotics, Robotica, 32(2): 193-208, 2014.
- Di Mario E., Navarro I., and Martinoli A., "A Distributed Noise-Resistant Particle Swarm Optimization Algorithm for High-Dimensional Multi-Robot Learning". Proc. of the 2015 IEEE International Conference on Robotics and Automation, May 2015, pp. 5970-5976.

**Reading — Secondary**

- Chen C., Lin J., Yücesan E., and Chick S. E., "Simulation Budget Allocation for Further Enhancing the Efficiency of Ordinal Optimization". Discrete Event Dynamic Systems: Theory and Applications, pp. 251-270, 2000.
- Di Mario E., Navarro I., and Martinoli A., "The Effect of Fitness Distributions on PSO: Multi-Robot Learning and Benchmark Functions". Proc. of the 2014 IEEE Congress on Evolutionary Computation, July 2014, Beijing, China, pp. 2785-2792.
- Di Mario E., Navarro I., and Martinoli A., "Distributed Particle Swarm Optimization using Optimal Computing Budget Allocation for Multi-Robot Learning". IEEE Congress on Evolutionary Computation, 2015, pp. 566-572.

**Lab 10** — Particle Swarm Optimization application to noisy problems: benchmark functions and multi-robot problems.

## Week 13 — December 9 and 11

**Lecture**

More on combined multi-level modeling and metaheuristic optimization methods. General take-home messages of the course.

**Reading — Primary**

- Baumann C., Birch H., and Martinoli A., "Leveraging Multi-Level Modelling to Automatically Design Behavioral Arbitrators in Robotic Controllers". Proc. of the IEEE/RSJ Int. Conf. on Intelligent Robots and Systems, October 2022, Kyoto, Japan, pp. 9318-9325.
- Endo W., Baumann C., Asama H., and Martinoli A., "Automatic Multi-Robot Control Design and Optimization Leveraging Multi-Level Modeling: An Exploration Case Study". Proc. of the 22nd World Congress of the International Federation of Automatic Control, July 2023, Yokohama, Japan; IFAC PapersOnLine, Vol. 56, Issue 2, pp. 11462-11469.

**Reading — Secondary**

- Baumann C. and Martinoli A., "A Noise-Resistant Mixed-Discrete Particle Swarm Optimization Algorithm for the Automatic Design of Robotic Controllers". Proc. of the IEEE Congress on Evolutionary Computation, June 2022, Padova, Italy, DOI: 10.1109/CEC55065.2022.9870229 (9 pages).

**Lab** — Assistance for course project.
