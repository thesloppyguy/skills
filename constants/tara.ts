export const kpi = {
    EMP1002: {
        "employeeId": "EMP1002",
        "department": "Quality Assurance",
        "designation": "Quality Assurance Specialist",
        "companyObjectives": [
            {
                "name": "Zero Defect Manufacturing",
                "description": "Achieve zero defect rate in solar panel production through enhanced quality control processes"
            },
            {
                "name": "ISO 9001:2015 Compliance Excellence",
                "description": "Maintain 100% compliance with ISO 9001:2015 standards across all manufacturing processes"
            },
            {
                "name": "Supplier Quality Enhancement",
                "description": "Improve supplier quality metrics through comprehensive audit programs and collaborative improvement initiatives"
            }
        ],
        "historicalPerformance": [
            {
                "year": "2022",
                "rating": 4.0,
                "goals": [
                    {
                        "name": "Quality Control Process Improvement",
                        "progress": 85.0,
                        "weightage": 40.0
                    },
                    {
                        "name": "ISO Compliance Maintenance",
                        "progress": 90.0,
                        "weightage": 30.0
                    },
                    {
                        "name": "Supplier Audit Program",
                        "progress": 75.0,
                        "weightage": 30.0
                    }
                ]
            },
            {
                "year": "2023",
                "rating": 4.2,
                "goals": [
                    {
                        "name": "Defect Rate Reduction",
                        "progress": 88.0,
                        "weightage": 40.0
                    },
                    {
                        "name": "ISO 9001:2015 Compliance",
                        "progress": 95.0,
                        "weightage": 30.0
                    },
                    {
                        "name": "Supplier Quality Audits",
                        "progress": 80.0,
                        "weightage": 30.0
                    }
                ]
            }
        ],
        "currentGoals": [
            {
                "name": "Defect Rate Reduction",
                "progress": 95.0,
                "weight": 40.0
            },
            {
                "name": "ISO 9001:2015 Compliance",
                "progress": 100.0,
                "weight": 30.0
            },
            {
                "name": "Supplier Quality Audits",
                "progress": 83.0,
                "weight": 30.0
            }
        ],
        "industryBenchmarks": [
            {
                "metric": "Defect Rate in Solar Manufacturing",
                "value": 0.8,
                "unit": "%"
            },
            {
                "metric": "ISO Compliance Rate",
                "value": 98.5,
                "unit": "%"
            },
            // {
            //     "metric": "Supplier Audit Frequency",
            //     "value": 12.0,
            //     "unit": "audits per year"
            // }
        ],
        "teamSize": 6,
        "roleCompetencies": [
            {
                "name": "Quality Control (QC) & Quality Assurance (QA)",
                "level": "Expert"
            },
            {
                "name": "ISO 9001 & ISO 14001 Standards",
                "level": "Expert"
            },
            {
                "name": "Statistical Process Control (SPC)",
                "level": "Intermediate"
            },
            {
                "name": "Root Cause Analysis (RCA) & CAPA",
                "level": "Expert"
            },
            {
                "name": "Solar Panel Manufacturing Processes",
                "level": "Intermediate"
            }
        ]
    },
    EMP002: {
        "employeeId": "EMP002",
        "department": "Sales & Marketing",
        "designation": "Marketing Coordinator",
        "companyObjectives": [
          {
            "name": "Digital Transformation",
            "description": "Accelerate digital marketing initiatives to improve lead generation and customer engagement"
          },
          {
            "name": "Revenue Growth",
            "description": "Increase sales revenue by 25% through improved marketing campaigns and lead conversion"
          },
          {
            "name": "Brand Awareness",
            "description": "Enhance brand visibility in the renewable energy sector through strategic marketing campaigns"
          }
        ],
        "historicalPerformance": [
          {
            "year": "2023",
            "rating": 4.0,
            "goals": [
              {
                "name": "Lead Generation Support",
                "progress": 75.0,
                "weightage": 40.0
              },
              {
                "name": "Campaign Execution",
                "progress": 80.0,
                "weightage": 35.0
              },
              {
                "name": "Brand Development",
                "progress": 70.0,
                "weightage": 25.0
              }
            ]
          },
          {
            "year": "2024",
            "rating": 4.3,
            "goals": [
              {
                "name": "Marketing Campaign Execution (Solar Awareness)",
                "progress": 80.0,
                "weightage": 35.0
              },
              {
                "name": "Lead Generation Support for Sales",
                "progress": 65.0,
                "weightage": 30.0
              },
              {
                "name": "Digital Marketing Optimization",
                "progress": 70.0,
                "weightage": 35.0
              }
            ]
          }
        ],
        "currentGoals": [
          {
            "name": "Digital Campaign Performance (Leads, Engagement)",
            "progress": 70.0,
            "weight": 35.0
          },
          {
            "name": "Marketing-Sales Alignment (MQL to SQL Conversion)",
            "progress": 60.0,
            "weight": 25.0
          },
          {
            "name": "Brand Visibility & Awareness (Events, PR)",
            "progress": 80.0,
            "weight": 20.0
          },
          {
            "name": "Product Knowledge & Sustainability Messaging",
            "progress": 90.0,
            "weight": 20.0
          }
        ],
        "industryBenchmarks": [
          {
            "metric": "Lead Conversion Rate",
            "value": 15.0,
            "unit": "%"
          },
          {
            "metric": "Marketing ROI",
            "value": 3.5,
            "unit": "ratio"
          },
          {
            "metric": "Cost Per Lead",
            "value": 45.0,
            "unit": "USD"
          }
        ],
        "teamSize": 6,
        "roleCompetencies": [
          {
            "name": "Digital Marketing (SEO, SEM, Social Media)",
            "level": "Intermediate"
          },
          {
            "name": "Content Marketing & Campaigns",
            "level": "Intermediate"
          },
          {
            "name": "Lead Generation & CRM",
            "level": "Intermediate"
          },
          {
            "name": "Market Research",
            "level": "Intermediate"
          }
        ]
    },
    EMP003: {
        "suggestions": [
            {
                "kpi_name": "Customer Satisfaction Score",
                "kpi_type": "outcome",
                "definition": "Measure the average customer satisfaction score post-installation.",
                "calculation": {
                    "expression": "SUM(Customer Satisfaction Ratings) / COUNT(Installations)",
                    "data_fields": [
                        "Customer Satisfaction Ratings",
                        "Installations"
                    ],
                    "aggregation_window": "monthly"
                },
                "unit": "rating",
                "target_value": 4.5,
                "target_type": "stretch",
                "data_requirements": [
                    "Customer feedback forms",
                    "Installation records"
                ],
                "dependents": [
                    "Installation Quality & Safety"
                ],
                "conflicts": [
                    {
                        "kpi_id": "Safety Incident Rate",
                        "reason": "Focusing solely on satisfaction might overlook safety protocols."
                    }
                ]
            },
            {
                "kpi_name": "Installation Time Efficiency",
                "kpi_type": "process",
                "definition": "Track the average time taken to complete installations per kW.",
                "calculation": {
                    "expression": "SUM(Installation Time) / SUM(kW Installed)",
                    "data_fields": [
                        "Installation Time",
                        "kW Installed"
                    ],
                    "aggregation_window": "monthly"
                },
                "unit": "hours",
                "target_value": 2.0,
                "target_type": "benchmark",
                "data_requirements": [
                    "Installation logs",
                    "Project timelines"
                ],
                "dependents": [
                    "On-time Project Installations"
                ],
                "conflicts": [
                    {
                        "kpi_id": "Installation Quality & Safety",
                        "reason": "Reducing time might compromise quality."
                    }
                ]
            },
            {
                "kpi_name": "Safety Compliance Rate",
                "kpi_type": "leading",
                "definition": "% of installations completed without safety incidents.",
                "calculation": {
                    "expression": "(1 - (Safety Incidents / Total Installations)) * 100",
                    "data_fields": [
                        "Safety Incidents",
                        "Total Installations"
                    ],
                    "aggregation_window": "monthly"
                },
                "unit": "%",
                "target_value": 100.0,
                "target_type": "ideal",
                "data_requirements": [
                    "Safety incident reports",
                    "Installation records"
                ],
                "dependents": [
                    "Installation Quality & Safety"
                ],
                "conflicts": []
            },
            {
                "kpi_name": "Technical Skill Enhancement",
                "kpi_type": "leading",
                "definition": "Measure the progress in technical skill development among installation technicians.",
                "calculation": {
                    "expression": "SUM(Skill Assessment Scores) / COUNT(Technicians)",
                    "data_fields": [
                        "Skill Assessment Scores",
                        "Technicians"
                    ],
                    "aggregation_window": "quarterly"
                },
                "unit": "score",
                "target_value": 80.0,
                "target_type": "improvement",
                "data_requirements": [
                    "Skill assessment results",
                    "Training records"
                ],
                "dependents": [
                    "Team Development"
                ],
                "conflicts": []
            }
        ],
        "global_notes": "These KPIs are designed to align with the company's objectives of enhancing customer satisfaction, improving operational efficiency, and fostering team development. They consider historical performance and industry benchmarks to set realistic yet challenging targets."
    }
}

export const feedback = {
    EMP1002: {
        "agenda": [
            {
                "order": 1,
                "topic": "Performance Review Overview",
                "duration_minutes": 10,
                "priority": "High"
            },
            {
                "order": 2,
                "topic": "Discussion of 2023 Performance Ratings",
                "duration_minutes": 15,
                "priority": "High"
            },
            {
                "order": 3,
                "topic": "Goal Setting for 2024",
                "duration_minutes": 15,
                "priority": "High"
            },
            {
                "order": 4,
                "topic": "Skill Development and Learning Progress",
                "duration_minutes": 10,
                "priority": "Medium"
            },
            {
                "order": 5,
                "topic": "Feedback on Team Collaboration & Training",
                "duration_minutes": 10,
                "priority": "Medium"
            },
            {
                "order": 6,
                "topic": "Open Discussion and Q&A",
                "duration_minutes": 10,
                "priority": "Low"
            }
        ],
        "discussion_prompts": [
            {
                "for": "Emily Johnson",
                "text": "What do you feel were your biggest achievements in the past year?"
            },
            {
                "for": "Emily Johnson",
                "text": "Are there any challenges you faced that we can address together?"
            },
            {
                "for": "Emily Johnson",
                "text": "What skills would you like to develop further in the upcoming year?"
            }
        ],
        "ai_feedback_suggestions": [
            {
                "text": "Consider providing specific examples of how Emily's contributions have positively impacted the team."
            },
            {
                "text": "Encourage Emily to share her thoughts on how to improve supplier quality audits."
            },
            {
                "text": "Discuss the importance of maintaining ISO compliance and how it relates to her goals."
            }
        ],
        "auto_summary": {
            "highlights": "Emily has shown consistent performance with ratings above 4.0 over the past three years, achieving significant progress in her goals.",
            "action_items": [
                {
                    "action": "Set new performance goals for 2024",
                    "owner": "Emily Johnson",
                    "due_date": "2024-02-15",
                    "priority": "High"
                },
                {
                    "action": "Identify training opportunities for skill enhancement",
                    "owner": "Emily Johnson",
                    "due_date": "2024-03-01",
                    "priority": "Medium"
                }
            ],
            "themes": [
                "Continuous Improvement",
                "Skill Development",
                "Team Collaboration"
            ],
            "sentiment_score": 0.9,
            "key_concerns": [
                "Need for improvement in supplier quality audits",
                "Balancing workload with training commitments"
            ],
            "positive_notes": [
                "Achieved 100% ISO compliance in 2023",
                "Strong progress in defect rate reduction goals"
            ]
        },
        "follow_up_recommendations": [
            {
                "type": "Training",
                "desc": "Enroll in advanced auditing skills course to enhance compliance knowledge.",
                "confidence": 0.85,
                "estimated_impact": "High",
                "cost": 300
            },
            {
                "type": "Mentorship",
                "desc": "Pair with a senior team member for guidance on supplier quality improvement.",
                "confidence": 0.75,
                "estimated_impact": "Medium",
                "cost": 0
            }
        ],
        "risk_flags": [
            {
                "type": "Performance Risk",
                "level": "Medium",
                "description": "Supplier quality audits are currently below target.",
                "recommended_action": "Develop a focused action plan to improve audit completion rates."
            }
        ]
    },
    EMP002: {
        "agenda": [
            {
                "order": 1,
                "topic": "Performance Overview",
                "duration_minutes": 15,
                "priority": "High"
            },
            {
                "order": 2,
                "topic": "Goal Progress Review",
                "duration_minutes": 20,
                "priority": "High"
            },
            {
                "order": 3,
                "topic": "Skill Development Discussion",
                "duration_minutes": 15,
                "priority": "Medium"
            },
            {
                "order": 4,
                "topic": "Learning Progress Assessment",
                "duration_minutes": 15,
                "priority": "Medium"
            },
            {
                "order": 5,
                "topic": "Feedback and Next Steps",
                "duration_minutes": 10,
                "priority": "High"
            }
        ],
        "discussion_prompts": [
            {
                "for": "Sarah Elizabeth Johnson",
                "text": "What challenges have you faced in achieving your goals this quarter?"
            },
            {
                "for": "Sarah Elizabeth Johnson",
                "text": "How do you feel about your current skill levels and areas for improvement?"
            },
            {
                "for": "Sarah Elizabeth Johnson",
                "text": "What support do you need from me to help you achieve your goals?"
            }
        ],
        "ai_feedback_suggestions": [
            {
                "text": "Consider focusing on strategies to improve lead generation efforts."
            },
            {
                "text": "Explore additional training opportunities in event coordination."
            },
            {
                "text": "Leverage your strengths in digital marketing to enhance brand visibility."
            }
        ],
        "auto_summary": {
            "highlights": "Sarah has shown strong performance in marketing campaign execution and brand development, with a solid rating of 4.3. She is on track with most of her goals but needs support in lead generation.",
            "action_items": [
                {
                    "action": "Develop a plan to improve lead generation strategies",
                    "owner": "Sarah Elizabeth Johnson",
                    "due_date": "2024-12-01",
                    "priority": "High"
                },
                {
                    "action": "Identify training resources for event coordination",
                    "owner": "Sarah Elizabeth Johnson",
                    "due_date": "2024-12-15",
                    "priority": "Medium"
                }
            ],
            "themes": [
                "Performance Improvement",
                "Skill Development",
                "Goal Alignment"
            ],
            "sentiment_score": 0.8,
            "key_concerns": [
                "Lead generation progress is below target",
                "Need for improvement in event coordination skills"
            ],
            "positive_notes": [
                "Strong progress in marketing campaign execution",
                "Good understanding of brand development strategies"
            ]
        },
        "follow_up_recommendations": [
            {
                "type": "Training",
                "desc": "Enroll in an advanced event coordination workshop to enhance skills.",
                "confidence": 0.85,
                "estimated_impact": "High",
                "cost": 300
            },
            {
                "type": "Mentorship",
                "desc": "Pair with a senior marketer for guidance on lead generation strategies.",
                "confidence": 0.75,
                "estimated_impact": "Medium",
                "cost": 0
            }
        ],
        "risk_flags": [
            {
                "type": "Performance Risk",
                "level": "Medium",
                "description": "Lead generation is currently below target, which may impact overall sales.",
                "recommended_action": "Implement a focused strategy to boost lead generation efforts."
            },
            {
                "type": "Skill Gap",
                "level": "Low",
                "description": "Event coordination skills are at a beginner level, which may hinder future event success.",
                "recommended_action": "Encourage participation in relevant training programs."
            }
        ]
    },
    EMP003: {
        "agenda": [
            {
                "order": 1,
                "topic": "Performance Overview",
                "duration_minutes": 15,
                "priority": "high"
            },
            {
                "order": 2,
                "topic": "Goal Progress Discussion",
                "duration_minutes": 20,
                "priority": "high"
            },
            {
                "order": 3,
                "topic": "Skill Development Opportunities",
                "duration_minutes": 15,
                "priority": "medium"
            },
            {
                "order": 4,
                "topic": "Learning Progress Review",
                "duration_minutes": 15,
                "priority": "medium"
            },
            {
                "order": 5,
                "topic": "Feedback and Suggestions",
                "duration_minutes": 10,
                "priority": "high"
            }
        ],
        "discussion_prompts": [
            {
                "for": "Michael David Brown",
                "text": "What challenges have you faced in achieving your installation goals?"
            },
            {
                "for": "Michael David Brown",
                "text": "How do you feel about your current skill levels and areas for improvement?"
            },
            {
                "for": "Michael David Brown",
                "text": "What support do you need from me to enhance your performance?"
            }
        ],
        "ai_feedback_suggestions": [
            {
                "text": "Consider setting specific milestones for your learning courses to track progress more effectively."
            },
            {
                "text": "Explore mentorship opportunities within the team to enhance your troubleshooting skills."
            },
            {
                "text": "Regularly review safety compliance protocols to ensure you meet the 100% target."
            }
        ],
        "auto_summary": {
            "highlights": "Michael has shown strong performance in timely installations and safety compliance, with areas for improvement in customer satisfaction and technical skill development.",
            "action_items": [
                {
                    "action": "Set up a mentorship program for troubleshooting skills.",
                    "owner": "MGR103",
                    "due_date": "2024-02-15",
                    "priority": "high"
                },
                {
                    "action": "Schedule regular check-ins to monitor learning progress.",
                    "owner": "MGR103",
                    "due_date": "2024-02-01",
                    "priority": "medium"
                }
            ],
            "themes": [
                "Performance Improvement",
                "Skill Development",
                "Safety Compliance"
            ],
            "sentiment_score": 0.8,
            "key_concerns": [
                "Customer satisfaction is below target.",
                "Technical skill development needs attention."
            ],
            "positive_notes": [
                "Strong progress in installation quality and safety compliance.",
                "Good teamwork and coordination on site."
            ]
        },
        "follow_up_recommendations": [
            {
                "type": "Training",
                "desc": "Enroll Michael in advanced troubleshooting workshops.",
                "confidence": 0.9,
                "estimated_impact": "High improvement in technical skills.",
                "cost": 300
            },
            {
                "type": "Mentorship",
                "desc": "Pair Michael with a senior technician for hands-on learning.",
                "confidence": 0.85,
                "estimated_impact": "Enhanced problem-solving capabilities.",
                "cost": 0
            }
        ],
        "risk_flags": [
            {
                "type": "Performance Risk",
                "level": "medium",
                "description": "Customer satisfaction is currently at 75%, below the target.",
                "recommended_action": "Implement feedback mechanisms to improve customer interactions."
            },
            {
                "type": "Skill Gap",
                "level": "high",
                "description": "Troubleshooting skills are at a beginner level.",
                "recommended_action": "Prioritize training in troubleshooting and repairs."
            }
        ]
    }
}

export const recommendations = {
    EMP1002: {
        "development_plan": {
            "plan": [
                {
                    "type": "Training",
                    "title": "Advanced Statistical Process Control",
                    "provider": "Quality Institute",
                    "estimated_time_hours": 20,
                    "prerequisites": [
                        "Basic Statistical Process Control"
                    ],
                    "learning_objectives": [
                        "Apply advanced statistical methods to quality control",
                        "Analyze process data to identify trends and variations",
                        "Implement SPC tools in manufacturing processes"
                    ],
                    "alignment": {
                        "skill": "Statistical Process Control (SPC)",
                        "level": "Advanced"
                    },
                    "urgency": "High",
                    "success_metrics": [
                        {
                            "metric": "Improvement in defect rate",
                            "expected_change": "Decrease by 15% within 6 months"
                        },
                        {
                            "metric": "Application of SPC tools",
                            "expected_change": "Successful implementation in 3 processes within 3 months"
                        }
                    ]
                },
                {
                    "type": "Coaching",
                    "title": "Root Cause Analysis and CAPA Enhancement",
                    "provider": "Internal Coach",
                    "estimated_time_hours": 10,
                    "prerequisites": [
                        "Basic Root Cause Analysis"
                    ],
                    "learning_objectives": [
                        "Enhance skills in root cause analysis techniques",
                        "Develop effective CAPA plans",
                        "Improve team collaboration in problem-solving"
                    ],
                    "alignment": {
                        "skill": "Root Cause Analysis (RCA) & CAPA",
                        "level": "Expert"
                    },
                    "urgency": "Medium",
                    "success_metrics": [
                        {
                            "metric": "Effectiveness of CAPA plans",
                            "expected_change": "Increase effectiveness rating to 90% within 3 months"
                        },
                        {
                            "metric": "Team collaboration feedback",
                            "expected_change": "Achieve a team satisfaction score of 4.5/5"
                        }
                    ]
                }
            ]
        },
        "recommended_coaching_scripts": [
            {
                "context": "Discussing progress on defect rate reduction",
                "script": "Emily, you've made significant progress on reducing the defect rate. Let's explore the advanced statistical methods you learned and how we can apply them to further enhance our processes."
            },
            {
                "context": "Feedback on ISO compliance leadership",
                "script": "Your leadership in maintaining ISO compliance has been outstanding. How can we leverage your experience to mentor others in the team?"
            }
        ],
        "evaluation_plan": {
            "checkpoints": [
                {
                    "in_weeks": 4,
                    "type": "Progress Review",
                    "criteria": [
                        "Completion of Advanced Statistical Process Control course",
                        "Implementation of SPC tools in at least one process"
                    ],
                    "evaluator": "Manager"
                },
                {
                    "in_weeks": 8,
                    "type": "Performance Assessment",
                    "criteria": [
                        "Reduction in defect rate",
                        "Feedback from team on collaboration and training"
                    ],
                    "evaluator": "Manager"
                }
            ]
        },
        "explainability": [
            "The development plan focuses on enhancing Emily's skills in statistical process control and root cause analysis, which are critical for her role.",
            "Coaching and training are aligned with her performance goals and feedback received, ensuring relevance and applicability."
        ],
        "confidence": 0.85,
        "alternative_paths": [
            {
                "name": "Online Course on Quality Management Systems",
                "description": "A comprehensive online course covering various quality management systems including ISO standards.",
                "estimated_time": "30 hours",
                "cost": 300,
                "success_probability": 0.7
            },
            {
                "name": "Mentorship Program in Quality Assurance",
                "description": "Pairing with a senior quality assurance professional for hands-on mentorship.",
                "estimated_time": "6 months",
                "cost": 0,
                "success_probability": 0.8
            }
        ],
        "warnings": [
            "Ensure that the training does not conflict with ongoing projects.",
            "Monitor workload to prevent burnout while pursuing additional learning."
        ]
    },
    EMP002: {
        "development_plan": {
            "plan": [
                {
                    "type": "Training",
                    "title": "Advanced Digital Marketing Strategies",
                    "provider": "Coursera",
                    "estimated_time_hours": 40,
                    "prerequisites": [
                        "Digital Marketing for Renewable Energy",
                        "HubSpot Marketing Hub Mastery"
                    ],
                    "learning_objectives": [
                        "Enhance skills in SEO and SEM",
                        "Develop advanced strategies for social media marketing",
                        "Learn to optimize lead conversion rates"
                    ],
                    "alignment": {
                        "skill": "Digital Marketing (SEO, SEM, Social Media)",
                        "level": "Advanced"
                    },
                    "urgency": "High",
                    "success_metrics": [
                        {
                            "metric": "Lead Conversion Rate",
                            "expected_change": "Increase by 20%"
                        },
                        {
                            "metric": "Campaign Engagement",
                            "expected_change": "Increase by 15%"
                        }
                    ]
                },
                {
                    "type": "Workshop",
                    "title": "Effective Event Coordination",
                    "provider": "Local Marketing Association",
                    "estimated_time_hours": 16,
                    "prerequisites": [],
                    "learning_objectives": [
                        "Learn best practices for event planning and execution",
                        "Understand logistics and vendor management",
                        "Enhance skills in audience engagement during events"
                    ],
                    "alignment": {
                        "skill": "Event & Trade Show Coordination",
                        "level": "Intermediate"
                    },
                    "urgency": "Medium",
                    "success_metrics": [
                        {
                            "metric": "Event Attendance",
                            "expected_change": "Increase by 30%"
                        },
                        {
                            "metric": "Post-Event Feedback Score",
                            "expected_change": "Achieve 4.5/5"
                        }
                    ]
                }
            ]
        },
        "recommended_coaching_scripts": [
            {
                "context": "Discussing performance in digital marketing campaigns",
                "script": "Sarah, you've shown strong performance in digital campaigns. Let's focus on strategies to improve your lead conversion optimization."
            },
            {
                "context": "Enhancing collaboration with the sales team",
                "script": "Your collaboration with the sales team has been excellent. How can we leverage this strength to improve our marketing-sales alignment further?"
            }
        ],
        "evaluation_plan": {
            "checkpoints": [
                {
                    "in_weeks": 4,
                    "type": "Progress Review",
                    "criteria": [
                        "Completion of Advanced Digital Marketing Strategies course",
                        "Improvement in lead conversion metrics"
                    ],
                    "evaluator": "MGR010"
                },
                {
                    "in_weeks": 8,
                    "type": "Performance Evaluation",
                    "criteria": [
                        "Event coordination success metrics",
                        "Feedback from sales team on collaboration"
                    ],
                    "evaluator": "MGR010"
                }
            ]
        },
        "explainability": [
            "The development plan focuses on enhancing Sarah's digital marketing skills, which are crucial for her role.",
            "Workshops on event coordination will help her transition from beginner to intermediate level.",
            "Regular checkpoints will ensure that progress is tracked and adjustments can be made as needed."
        ],
        "confidence": 0.85,
        "alternative_paths": [
            {
                "name": "Mentorship Program",
                "description": "Pairing with a senior marketing strategist for guidance and support.",
                "estimated_time": "6 months",
                "cost": 0,
                "success_probability": 0.7
            },
            {
                "name": "Online Certification in Event Management",
                "description": "A structured online course focusing on event management skills.",
                "estimated_time": "3 months",
                "cost": 300,
                "success_probability": 0.75
            }
        ],
        "warnings": [
            "Ensure to balance workload with learning commitments to avoid burnout.",
            "Monitor progress closely to address any challenges in lead conversion optimization."
        ]
    },
    EMP003: {
        "development_plan": {
            "plan": [
                {
                    "type": "Training",
                    "title": "Advanced Troubleshooting Techniques",
                    "provider": "TechSkills Academy",
                    "estimated_time_hours": 20,
                    "prerequisites": [
                        "Basic Troubleshooting Skills"
                    ],
                    "learning_objectives": [
                        "Understand advanced troubleshooting methodologies",
                        "Apply troubleshooting techniques to real-world scenarios",
                        "Enhance problem-solving skills in electrical systems"
                    ],
                    "alignment": {
                        "skill": "Troubleshooting & Repairs",
                        "level": "intermediate"
                    },
                    "urgency": "High",
                    "success_metrics": [
                        {
                            "metric": "Completion Rate",
                            "expected_change": "Increase from 30% to 80%"
                        },
                        {
                            "metric": "Troubleshooting Efficiency",
                            "expected_change": "Reduce average troubleshooting time by 30%"
                        }
                    ]
                },
                {
                    "type": "Workshop",
                    "title": "Electrical Safety Standards Refresher",
                    "provider": "Safety First Institute",
                    "estimated_time_hours": 8,
                    "prerequisites": [],
                    "learning_objectives": [
                        "Review current electrical safety standards",
                        "Identify common safety violations",
                        "Implement best practices for safety compliance"
                    ],
                    "alignment": {
                        "skill": "Electrical Wiring & Safety",
                        "level": "intermediate"
                    },
                    "urgency": "Medium",
                    "success_metrics": [
                        {
                            "metric": "Safety Compliance Rating",
                            "expected_change": "Maintain above 90%"
                        }
                    ]
                }
            ]
        },
        "recommended_coaching_scripts": [
            {
                "context": "Discussing performance ratings and areas for improvement",
                "script": "Michael, your performance rating of 4.1 shows that you're doing well, especially in timely installations and safety compliance. Let's focus on enhancing your troubleshooting skills to boost your overall effectiveness."
            },
            {
                "context": "Setting goals for the next quarter",
                "script": "Given your progress in technical skills, I recommend we set a goal to complete the Advanced Troubleshooting Techniques course within the next quarter. This will help you improve your troubleshooting efficiency significantly."
            }
        ],
        "evaluation_plan": {
            "checkpoints": [
                {
                    "in_weeks": 4,
                    "type": "Course Completion",
                    "criteria": [
                        "Completion of Advanced Troubleshooting Techniques course",
                        "Demonstration of learned skills in a practical setting"
                    ],
                    "evaluator": "Manager"
                },
                {
                    "in_weeks": 8,
                    "type": "Performance Review",
                    "criteria": [
                        "Improvement in troubleshooting efficiency",
                        "Feedback from team members on collaboration"
                    ],
                    "evaluator": "Manager"
                }
            ]
        },
        "explainability": [
            "The development plan focuses on enhancing Michael's troubleshooting skills, which is a key area for improvement based on his recent feedback and performance ratings.",
            "The urgency of the training is high due to the impact on project timelines and safety compliance."
        ],
        "confidence": 0.85,
        "alternative_paths": [
            {
                "name": "Mentorship Program",
                "description": "Pairing with a senior technician for hands-on troubleshooting experience.",
                "estimated_time": "3 months",
                "cost": 0,
                "success_probability": 0.75
            },
            {
                "name": "Online Learning Modules",
                "description": "Self-paced online courses on troubleshooting and safety standards.",
                "estimated_time": "2 months",
                "cost": 150,
                "success_probability": 0.65
            }
        ],
        "warnings": [
            "Delaying the completion of the Advanced Troubleshooting Techniques course may hinder progress in performance ratings.",
            "Neglecting safety standards can lead to compliance issues and affect project outcomes."
        ]
    }
}


export const flight_risk = {
    EMP1002: {
        "flight_risk_score": 0.15,
        "risk_level": "Low",
        "top_contributors": [
            {
                "factor": "Tenure with Company",
                "weight": 0.2,
                "detail": "Employee has been with the company for 2 years, which is relatively stable.",
                "trend": "Stable",
                "impact": "Low"
            },
            {
                "factor": "Career Growth Opportunities",
                "weight": 0.25,
                "detail": "Recent salary increase and positive performance rating indicate good career progression.",
                "trend": "Positive",
                "impact": "Low"
            },
            {
                "factor": "Work-Life Balance",
                "weight": 0.15,
                "detail": "Average weekly hours are reasonable, but lack of remote work options could be a concern.",
                "trend": "Stable",
                "impact": "Moderate"
            }
        ],
        "recommended_interventions": [
            {
                "action": "Introduce Remote Work Options",
                "priority": "Medium",
                "description": "Consider offering flexible work arrangements to improve work-life balance satisfaction.",
                "estimated_impact": 0.1,
                "time_to_implement": "3 months",
                "cost": 5000,
                "success_probability": 0.7
            },
            {
                "action": "Enhance Career Development Programs",
                "priority": "Low",
                "description": "Continue to provide training and mentorship opportunities to maintain career growth satisfaction.",
                "estimated_impact": 0.05,
                "time_to_implement": "6 months",
                "cost": 3000,
                "success_probability": 0.8
            }
        ],
        "confidence": 0.85
    },
    EMP002: {
        "flight_risk_score": 0.35,
        "risk_level": "Moderate",
        "top_contributors": [
            {
                "factor": "Compensation Satisfaction",
                "weight": 0.25,
                "detail": "Current salary is competitive but slightly below industry average for role and experience.",
                "trend": "Stable",
                "impact": "Moderate"
            },
            {
                "factor": "Career Growth Opportunities",
                "weight": 0.2,
                "detail": "No promotion in the last 3 years despite good performance ratings.",
                "trend": "Stable",
                "impact": "Moderate"
            },
            {
                "factor": "Manager Relationship",
                "weight": 0.15,
                "detail": "Good relationship with manager, high trust and effective feedback.",
                "trend": "Stable",
                "impact": "Positive"
            },
            {
                "factor": "Work-Life Balance",
                "weight": 0.1,
                "detail": "Satisfaction with work-life balance is high, with remote work options available.",
                "trend": "Stable",
                "impact": "Positive"
            }
        ],
        "recommended_interventions": [
            {
                "action": "Review Compensation Package",
                "priority": "High",
                "description": "Conduct a market analysis to ensure competitive salary and consider a salary adjustment.",
                "estimated_impact": 0.15,
                "time_to_implement": "3 months",
                "cost": 5000,
                "success_probability": 0.7
            },
            {
                "action": "Career Development Plan",
                "priority": "Medium",
                "description": "Develop a personalized career development plan with clear milestones and potential for promotion.",
                "estimated_impact": 0.1,
                "time_to_implement": "6 months",
                "cost": 2000,
                "success_probability": 0.6
            },
            {
                "action": "Enhance Training Opportunities",
                "priority": "Low",
                "description": "Increase training hours and provide access to advanced skill development programs.",
                "estimated_impact": 0.05,
                "time_to_implement": "4 months",
                "cost": 1000,
                "success_probability": 0.5
            }
        ],
        "confidence": 0.85
    },
    EMP003: {
        "flight_risk_score": 0.35,
        "risk_level": "Moderate",
        "top_contributors": [
            {
                "factor": "Tenure with Company",
                "weight": 0.25,
                "detail": "Michael has been with the company for only 1 year, which is a relatively short tenure.",
                "trend": "Stable",
                "impact": "Increased risk due to short tenure."
            },
            {
                "factor": "Career Growth Opportunities",
                "weight": 0.2,
                "detail": "No promotions in the last 3 years, although mentorship is available.",
                "trend": "Stable",
                "impact": "Moderate risk due to limited career advancement."
            },
            {
                "factor": "Compensation Satisfaction",
                "weight": 0.15,
                "detail": "Satisfaction score is 3.8, indicating some dissatisfaction with compensation.",
                "trend": "Improving",
                "impact": "Slight risk due to compensation concerns."
            },
            {
                "factor": "Work-Life Balance",
                "weight": 0.15,
                "detail": "Average weekly hours are 45 with occasional overtime, stress level score is 3.5.",
                "trend": "Stable",
                "impact": "Moderate risk due to work-life balance concerns."
            },
            {
                "factor": "Manager Relationship",
                "weight": 0.1,
                "detail": "High trust and effectiveness scores with monthly feedback.",
                "trend": "Stable",
                "impact": "Reduced risk due to positive manager relationship."
            }
        ],
        "recommended_interventions": [
            {
                "action": "Career Development Plan",
                "priority": "High",
                "description": "Develop a personalized career development plan to outline potential growth paths and opportunities for Michael.",
                "estimated_impact": 0.2,
                "time_to_implement": "3 months",
                "cost": 1000,
                "success_probability": 0.7
            },
            {
                "action": "Compensation Review",
                "priority": "Medium",
                "description": "Conduct a compensation review to ensure alignment with industry standards and address any dissatisfaction.",
                "estimated_impact": 0.15,
                "time_to_implement": "2 months",
                "cost": 500,
                "success_probability": 0.6
            },
            {
                "action": "Work-Life Balance Initiatives",
                "priority": "Medium",
                "description": "Introduce flexible work options or stress management programs to improve work-life balance.",
                "estimated_impact": 0.1,
                "time_to_implement": "4 months",
                "cost": 800,
                "success_probability": 0.65
            }
        ],
        "confidence": 0.8
    }
}